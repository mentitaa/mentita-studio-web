"use client";

const fieldStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #333",
  color: "#e0e0e0",
  fontFamily: "monospace",
  fontSize: 13,
  padding: "6px 0",
  outline: "none",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  color: "#555",
  fontSize: 12,
  fontFamily: "monospace",
  marginBottom: 4,
  display: "block",
};

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} style={fieldStyle} autoComplete="off" />
    </div>
  );
}

export default function ContactForm({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ padding: 20, fontFamily: "monospace", fontSize: 13 }}>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20, borderBottom: "1px solid #333", paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="#00c896" style={{ flexShrink: 0 }}>
            <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
          </svg>
          <span style={{ color: "#00c896", fontWeight: 600 }}>contacto/</span>
        </div>
        <span style={{ color: "#555", fontSize: 12 }}>// escríbeme y te respondo</span>
      </div>

      {/* Fields */}
      <Field label="nombre" />
      <Field label="email" type="email" />
      <Field label="teléfono" type="tel" />

      {/* Submit */}
      <button
        style={{
          width: "100%",
          padding: "10px 0",
          background: "transparent",
          border: "1px solid #00c896",
          color: "#00c896",
          fontFamily: "monospace",
          fontSize: 13,
          cursor: "pointer",
          borderRadius: 4,
          marginTop: 4,
          marginBottom: 12,
        }}
      >
        hablemos
      </button>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#555",
          fontFamily: "monospace",
          fontSize: 12,
          cursor: "pointer",
          padding: 0,
        }}
      >
        ← volver
      </button>

    </div>
  );
}
