"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  hover = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
