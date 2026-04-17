import TerminalScene from "./components/TerminalScene";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      {/* Background */}
      <img
        src="/bgms.png"
        alt=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
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
        © 2026 Mentita Studio
      </footer>

    </main>
  );
}
