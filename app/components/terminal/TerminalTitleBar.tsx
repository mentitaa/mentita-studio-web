"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dots = [
  { color: "#ff5f57", icon: "✕" },
  { color: "#ffbd2e", icon: "−" },
  { color: "#28c840", icon: "⤢" },
];

function Dot({ color, icon }: { color: string; icon: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: color,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        padding: 0,
        cursor: "default",
        flexShrink: 0,
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            style={{
              position: "absolute",
              fontSize: 11,
              color: "#333",
              lineHeight: 1,
              userSelect: "none",
              fontWeight: 700,
            }}
          >
            {icon}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function TerminalTitleBar() {
  return (
    <div
      style={{
        height: 36,
        background: "#2a2a2c",
        display: "flex",
        alignItems: "center",
        paddingInline: 12,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        gap: 16,
      }}
    >
      {/* Dots */}
      <div style={{ display: "flex", gap: 6 }}>
        {dots.map((d) => (
          <Dot key={d.color} color={d.color} icon={d.icon} />
        ))}
      </div>

      {/* Title */}
      <span
        style={{
          color: "#999",
          fontSize: 12,
          fontFamily: "monospace",
          userSelect: "none",
        }}
      >
        Mentita Studio/Vibe coding projects
      </span>
    </div>
  );
}
