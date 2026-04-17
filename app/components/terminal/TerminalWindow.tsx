"use client";

import { motion } from "framer-motion";
import TerminalTitleBar from "./TerminalTitleBar";
import TerminalContent from "./TerminalContent";

export default function TerminalWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: 480,
        background: "#1c1c1e",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <TerminalTitleBar />

      <TerminalContent />
    </motion.div>
  );
}
