"use client";

export default function LogoAnimado() {
  return (
    <video
      src="/logo.webm"
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        top: 24,
        right: -60,
        width: 1000,
        height: "auto",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
