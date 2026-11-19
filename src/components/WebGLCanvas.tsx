import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import useWebGL from '@/hooks/useWebGL';
import { useAnimationSystem } from '@/contexts/AnimationContext';

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const BACKGROUND_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const BACKGROUND_FRAG = /* glsl */`
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  varying vec2  vUv;

  // --- Simplex-like smooth noise ---
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x   + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    // Mouse influence zone
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    float mouseDist = distance(uv, mouseUV);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.15;

    // Scroll warp
    uv.y -= uScroll * 0.08;

    // Layered noise for fluid motion
    float n1 = snoise(uv * 2.5 + vec2(t, t * 0.7));
    float n2 = snoise(uv * 4.0 + vec2(-t * 0.8, t * 1.3) + uMouse * 0.3);
    float n3 = snoise(uv * 1.2 + vec2(t * 0.4, -t * 0.5));
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    noise += mouseInfluence;

    // Color palette — deep blue/teal → near black
    vec3 colA = vec3(0.04, 0.06, 0.12); // near-black deep blue
    vec3 colB = vec3(0.02, 0.14, 0.10); // near-black teal/green
    vec3 colC = vec3(0.08, 0.04, 0.16); // near-black purple

    float t1 = noise * 0.5 + 0.5;
    float t2 = snoise(uv * 3.0 + t) * 0.5 + 0.5;
    vec3 col = mix(colA, colB, t1);
    col = mix(col, colC, t2 * 0.4);

    // Vignette
    float vig = 1.0 - length((uv - 0.5) * 1.4);
    col *= smoothstep(0.0, 0.7, vig);

    // Mouse glow spot
    vec3 glowColor = vec3(0.1, 0.6, 0.4); // accent green
    col += glowColor * mouseInfluence * 0.3;

    gl_FragColor = vec4(col, 0.95);
  }
`;

const PARTICLE_VERT = /* glsl */`
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Gentle float
    float t = uTime * aSpeed + aOffset;
    pos.x += sin(t * 0.7) * 0.3;
    pos.y += cos(t * 0.5) * 0.3 + sin(t * 1.1) * 0.15;
    pos.z += sin(t * 0.3) * 0.2;

    // Mouse repulsion (inverted depth)
    float distToMouse = distance(pos.xy * 0.1, uMouse);
    float repulse = smoothstep(1.2, 0.0, distToMouse) * 0.4;
    pos.x += uMouse.x * repulse * 0.5;
    pos.y += uMouse.y * repulse * 0.5;

    // Scroll drift
    pos.y -= uScroll * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Fade by depth
    vAlpha = smoothstep(-8.0, 2.0, pos.z) * 0.7;
  }
`;

const PARTICLE_FRAG = /* glsl */`
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    // Circular particle
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    float alpha = (1.0 - sqrt(r)) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const getPerformanceProfile = () => {
  if (typeof window === 'undefined') {
    return { mobile: true, reduced: true, particleCount: 0, pixelRatio: 1 };
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowMemory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4
    : false;

  const mobile =
    window.innerWidth < 768 ||
    /Android|iPhone|iPad/i.test(navigator.userAgent) ||
    coarse;

  const reduced = reducedMotion || lowMemory;

  return {
    mobile,
    reduced,
    particleCount: mobile ? 0 : reduced ? 700 : 1400,
    pixelRatio: mobile ? 1 : reduced ? 1 : 1.25,
  };
};

const WebGLCanvas = () => {
  const { canvasRef, rendererRef, sceneRef, cameraRef, clockRef } = useWebGL();
  const { mouseRef, scrollRef } = useAnimationSystem();
  const rafRef = useRef<number>(0);
  const materialsRef = useRef<{ bg: THREE.ShaderMaterial; particles: THREE.ShaderMaterial } | null>(null);
  const meshesRef = useRef<{
    bgPlane?: THREE.Mesh;
    particles?: THREE.Points;
    ambientMeshes: THREE.Mesh[];
  }>({ ambientMeshes: [] });
  const profile = useMemo(() => getPerformanceProfile(), []);

  const buildScene = useCallback((scene: THREE.Scene) => {
    // ── Background Plane ──────────────────────────────────────────────────
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BACKGROUND_VERT,
      fragmentShader: BACKGROUND_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
      },
      depthWrite: false,
    });
    const bgPlane = new THREE.Mesh(bgGeo, bgMat);
    bgPlane.renderOrder = -1;
    scene.add(bgPlane);

    // ── Particles ─────────────────────────────────────────────────────────
    const positions = new Float32Array(profile.particleCount * 3);
    const scales = new Float32Array(profile.particleCount);
    const speeds = new Float32Array(profile.particleCount);
    const offsets = new Float32Array(profile.particleCount);

    for (let i = 0; i < profile.particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 8 - 2;
      scales[i]  = Math.random() * 1.5 + 0.5;
      speeds[i]  = Math.random() * 0.4 + 0.1;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    particleGeo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    particleGeo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color(0.1, 0.75, 0.5) }, // accent color
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    if (profile.particleCount > 0) {
      scene.add(particles);
    }

    // ── Ambient Geometry ──────────────────────────────────────────────────
    const ambientGeos = profile.reduced
      ? [new THREE.IcosahedronGeometry(1.1, 0)]
      : [
          new THREE.IcosahedronGeometry(1.2, 0),
          new THREE.IcosahedronGeometry(0.7, 0),
          new THREE.OctahedronGeometry(0.9, 0),
        ];
    const ambientMat = new THREE.MeshBasicMaterial({
      color: 0x0d2a20,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const ambientMeshes: THREE.Mesh[] = ambientGeos.map((geo, i) => {
      const m = new THREE.Mesh(geo, ambientMat.clone());
      m.position.set([4, -6, 3][i] ?? 4, [2, -3, -4][i] ?? 2, [-3, -2, -5][i] ?? -3);
      scene.add(m);
      return m;
    });

    materialsRef.current = { bg: bgMat, particles: particleMat };
    meshesRef.current = { bgPlane, particles, ambientMeshes };

    return { bgMat, particleMat, ambientMeshes };
  }, [profile.particleCount, profile.reduced]);

  useEffect(() => {
    if (profile.mobile) return;

    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const clock = clockRef.current;
    if (!scene || !renderer || !camera) return;

    const { bgMat, particleMat, ambientMeshes } = buildScene(scene);
    let visible = document.visibilityState === 'visible';

    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ── RAF Loop ──────────────────────────────────────────────────────────
    const tick = () => {
      if (!visible) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;

      // Update uniforms
      bgMat.uniforms.uTime.value = elapsed;
      bgMat.uniforms.uMouse.value.set(mouse.ndx, mouse.ndy);
      bgMat.uniforms.uScroll.value = scroll.progress;

      particleMat.uniforms.uTime.value = elapsed;
      particleMat.uniforms.uMouse.value.set(mouse.ndx, mouse.ndy);
      particleMat.uniforms.uScroll.value = scroll.progress;

      // Camera subtle parallax
      camera.position.x += (mouse.ndx * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (mouse.ndy * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Ambient mesh rotation
      ambientMeshes.forEach((m, i) => {
        m.rotation.x += profile.reduced ? 0.0006 : (0.001 + i * 0.0005);
        m.rotation.y += profile.reduced ? 0.001 : (0.002 + i * 0.0003);
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      meshesRef.current.ambientMeshes.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      if (meshesRef.current.particles) {
        scene.remove(meshesRef.current.particles);
        meshesRef.current.particles.geometry.dispose();
        if (Array.isArray(meshesRef.current.particles.material)) {
          meshesRef.current.particles.material.forEach((material) => material.dispose());
        } else {
          meshesRef.current.particles.material.dispose();
        }
      }

      if (meshesRef.current.bgPlane) {
        scene.remove(meshesRef.current.bgPlane);
        meshesRef.current.bgPlane.geometry.dispose();
        if (Array.isArray(meshesRef.current.bgPlane.material)) {
          meshesRef.current.bgPlane.material.forEach((material) => material.dispose());
        } else {
          meshesRef.current.bgPlane.material.dispose();
        }
      }
    };
  }, [profile, buildScene, mouseRef, scrollRef, sceneRef, rendererRef, cameraRef, clockRef]);

  if (profile.mobile) {
    return (
      <div
        className="webgl-canvas-mobile"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse at 30% 30%, hsl(160 60% 8% / 0.95) 0%, hsl(240 20% 4% / 0.98) 70%)',
          pointerEvents: 'none',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
};

export default WebGLCanvas;
