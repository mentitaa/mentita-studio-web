"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "./terminal/TerminalWindow";
import TerminalContent from "./terminal/TerminalContent";
import ContactView from "./terminal/ContactView";

// ─── Hacker text ─────────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";
const COLS = 44;
const ROWS = 7;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const randomLine = () => Array.from({ length: COLS }, randomChar).join("");

function HackerText() {
  const [lines, setLines] = useState<string[]>(() =>
    Array.from({ length: ROWS }, randomLine)
  );

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const interval = isMobile ? 120 : 80;

    const id = setInterval(() => {
      setLines(Array.from({ length: ROWS }, randomLine));
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "monospace",
        fontSize: 11,
        lineHeight: 1.7,
        position: "relative",
        overflow: "hidden",
        willChange: "contents",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ color: "#00ff41", letterSpacing: 1 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

// ─── Phase machine ────────────────────────────────────────────────────────────

type Phase = "idle" | "hacking" | "contact";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fast = { duration: 0.3 };

export default function TerminalScene() {
  const [phase, setPhase] = useState<Phase>("idle");

  // After 2s of hacker text → switch to contact form
  useEffect(() => {
    if (phase !== "hacking") return;
    const id = setTimeout(() => setPhase("contact"), 2000);
    return () => clearTimeout(id);
  }, [phase]);

  const handleContact = () => setPhase("hacking");
  const handleBack   = () => setPhase("idle");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

      {/* Terminal */}
      <TerminalWindow>
        <AnimatePresence mode="wait">

          {phase === "idle" && (
            <motion.div key="content" {...fade} transition={fast}>
              <TerminalContent />
            </motion.div>
          )}

          {phase === "hacking" && (
            <motion.div key="hacker" {...fade} transition={fast}>
              <HackerText />
            </motion.div>
          )}

          {phase === "contact" && (
            <motion.div key="form" {...fade} transition={fast}>
              <ContactView onBack={handleBack} />
            </motion.div>
          )}

        </AnimatePresence>
      </TerminalWindow>

      {/* Contact button — only visible in idle */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            key="btn"
            onClick={handleContact}
            {...fade}
            transition={fast}
            style={{
              background: "transparent",
              border: "1px solid rgba(0,200,150,0.35)",
              color: "#00c896",
              fontFamily: "monospace",
              fontSize: 12,
              padding: "8px 20px",
              borderRadius: 4,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            contáctame
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
