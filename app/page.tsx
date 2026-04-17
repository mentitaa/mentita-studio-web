"use client";

import { motion } from "framer-motion";
import TerminalScene from "./components/TerminalScene";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      {/* Background desktop */}
      <img
        src="/bgms.png"
        alt=""
        className="hidden md:block"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />

      {/* Background mobile */}
      <img
        src="/bgms-mobile.png"
        alt=""
        className="block md:hidden"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />

      {/* Logo + terminal + contact button */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="/logo.svg"
          alt="Mentita Studio"
          style={{ width: 180, marginBottom: 24 }}
        />
        <TerminalScene />
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#555",
          fontSize: 12,
          fontFamily: "monospace",
          userSelect: "none",
          zIndex: 10,
        }}
      >
        <motion.p
          animate={{
            opacity: [0.2, 1, 1, 0.2],
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)",
              "0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ margin: 0 }}
        >
          © 2026 Mentita Studio
        </motion.p>
      </footer>

    </main>
  );
}
