"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimationProps {
  animation: {
    initial: Record<string, number>;
    animate: Record<string, number>;
    transition?: Record<string, number>;
  };
  children: React.ReactNode;
  className?: string;
}

export function AnimationDiv({
  animation,
  children,
  className,
}: AnimationProps) {
  return (
    <motion.div {...animation} className={className}>
      {children}
    </motion.div>
  );
}
