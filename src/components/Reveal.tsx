import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
    delay?: number;
}

const Reveal = ({ children, delay = 0, ...props }: RevealProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
