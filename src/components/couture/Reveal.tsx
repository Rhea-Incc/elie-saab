import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "span" | "h1" | "h2" | "p";
};

export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function ImageVeil({
  src,
  alt,
  className,
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${aspect} ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 2.4, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.div
        aria-hidden
        initial={reduce ? { scaleY: 0 } : { scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-0 bg-ivory"
      />
    </div>
  );
}
