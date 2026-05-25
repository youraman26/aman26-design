import { motion } from "motion/react";
import React from "react";

export const AnimatedHeading = ({ text, className, style }: { text: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  // If text is a string, we can split it. If it contains HTML like <br /> and <span>, it's harder.
  // We can pass an array of words or a string, but the existing code has mixed content.
  return null;
}
