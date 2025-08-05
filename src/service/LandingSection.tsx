"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function LandingSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.5,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
