"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Countries ────────────────────────────────────────────────────────────────

const COUNTRIES = [
  { code: "PE", flag: "🇵🇪", dial: "+51",  name: "Perú"           },
  { code: "US", flag: "🇺🇸", dial: "+1",   name: "Estados Unidos" },
  { code: "MX", flag: "🇲🇽", dial: "+52",  name: "México"         },
  { code: "AR", flag: "🇦🇷", dial: "+54",  name: "Argentina"      },
  { code: "CO", flag: "🇨🇴", dial: "+57",  name: "Colombia"       },
  { code: "CL", flag: "🇨🇱", dial: "+56",  name: "Chile"          },
  { code: "ES", flag: "🇪🇸", dial: "+34",  name: "España"         },
  { code: "BR", flag: "🇧🇷", dial: "+55",  name: "Brasil"         },
  { code: "EC", flag: "🇪🇨", dial: "+593", name: "Ecuador"        },
  { code: "BO", flag: "🇧🇴", dial: "+591", name: "Bolivia"        },
  { code: "PY", flag: "🇵🇾", dial: "+595", name: "Paraguay"       },
  { code: "UY", flag: "🇺🇾", dial: "+598", name: "Uruguay"        },
  { code: "VE", flag: "🇻🇪", dial: "+58",  name: "Venezuela"      },
  { code: "GT", flag: "🇬🇹", dial: "+502", name: "Guatemala"      },
  { code: "CR", flag: "🇨🇷", dial: "+506", name: "Costa Rica"     },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
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

// ─── Country selector ─────────────────────────────────────────────────────────

function CountrySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = COUNTRIES.find((c) => c.code === value)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "1px solid #333",
          color: "#e0e0e0",
          fontFamily: "monospace",
          fontSize: 13,
          padding: "6px 8px 6px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          whiteSpace: "nowrap",
        }}
      >
        <span>{selected.flag}</span>
        <span style={{ color: "#888" }}>{selected.dial}</span>
        <span style={{ color: "#555", fontSize: 10, marginLeft: 2 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 50,
              background: "#2a2a2c",
              border: "1px solid #333",
              borderRadius: 6,
              overflowY: "auto",
              maxHeight: 200,
              minWidth: 180,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onChange(c.code); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "7px 12px",
                  background: c.code === value ? "rgba(0,200,150,0.08)" : "transparent",
                  border: "none",
                  color: c.code === value ? "#00c896" : "#ccc",
                  fontFamily: "monospace",
                  fontSize: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>{c.flag}</span>
                <span style={{ color: "#888", width: 36 }}>{c.dial}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Field with hover label ───────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ marginBottom: 18 }}>
      <label
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          fontFamily: "monospace",
          fontSize: 11,
          marginBottom: 4,
          color: hovered ? "#e0e0e0" : "#555",
          transition: "color 0.2s",
          cursor: "default",
          userSelect: "none",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
        autoComplete="off"
      />
    </div>
  );
}

// ─── Success popup ────────────────────────────────────────────────────────────

function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(28,28,30,0.92)",
        borderRadius: 10,
        zIndex: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#2a2a2c",
          border: "1px solid #333",
          borderRadius: 8,
          padding: "20px 24px",
          fontFamily: "monospace",
          maxWidth: 320,
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#28c840", flexShrink: 0, display: "inline-block",
            }}
          />
          <span style={{ color: "#28c840", fontSize: 12 }}>mensaje enviado</span>
        </div>
        <p style={{ color: "#e0e0e0", fontSize: 13, margin: "0 0 20px", lineHeight: 1.6 }}>
          información guardada. te contactaré lo más pronto posible.
        </p>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            fontFamily: "monospace",
            fontSize: 12,
            padding: "6px 14px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          cerrar
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactView({ onBack }: { onBack: () => void }) {
  const [nombre,   setNombre]   = useState("");
  const [email,    setEmail]    = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais,     setPais]     = useState("PE");
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === pais)!;

  const doSubmit = async () => {
    console.log("botón hablemos clickeado");
    setApiError(null);
    setLoading(true);
    try {
      const body = {
        nombre,
        email,
        telefono: `${selectedCountry.dial} ${telefono}`,
        pais: `${selectedCountry.flag} ${selectedCountry.name}`,
      };
      console.log("enviando:", body);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("API response:", data);
      if (data.ok) {
        setSuccess(true);
      } else {
        setApiError(data.error ?? "error desconocido");
      }
    } catch (err) {
      console.error("fetch error:", err);
      setApiError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSubmit();
  };

  return (
    <div style={{ position: "relative", padding: 20, fontFamily: "monospace", fontSize: 13 }}>

      <AnimatePresence>
        {success && <SuccessPopup onClose={() => { setSuccess(false); onBack(); }} />}
      </AnimatePresence>

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
          marginBottom: 16,
          display: "block",
        }}
      >
        ← volver
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: 20,
          borderBottom: "1px solid #333",
          paddingBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="#00c896" style={{ flexShrink: 0 }}>
            <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
          </svg>
          <span style={{ color: "#00c896", fontWeight: 600 }}>contacto/</span>
        </div>
        <span style={{ color: "#555", fontSize: 12 }}>// cuéntame tu idea</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Field label="nombre"    value={nombre}   onChange={setNombre}   />
        <Field label="email"     type="email"      value={email}    onChange={setEmail}    />

        {/* Phone with country selector */}
        <div style={{ marginBottom: 18 }}>
          <PhoneField
            telefono={telefono}
            setTelefono={setTelefono}
            pais={pais}
            setPais={setPais}
          />
        </div>

        {apiError && (
          <div style={{ color: "#ff5f57", fontSize: 11, fontFamily: "monospace", marginBottom: 8, wordBreak: "break-all" }}>
            // error: {apiError}
          </div>
        )}

        <button
          type="submit"
          onClick={doSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "transparent",
            border: "1px solid #00c896",
            color: loading ? "#555" : "#00c896",
            fontFamily: "monospace",
            fontSize: 13,
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: 4,
            marginTop: 4,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "enviando..." : "hablemos"}
        </button>
      </form>
    </div>
  );
}

// ─── Phone field (label + selector + input) ───────────────────────────────────

function PhoneField({
  telefono, setTelefono, pais, setPais,
}: {
  telefono: string;
  setTelefono: (v: string) => void;
  pais: string;
  setPais: (v: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <label
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          fontFamily: "monospace",
          fontSize: 11,
          marginBottom: 4,
          color: hovered ? "#e0e0e0" : "#555",
          transition: "color 0.2s",
          cursor: "default",
          userSelect: "none",
        }}
      >
        teléfono
      </label>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
        <CountrySelector value={pais} onChange={setPais} />
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="000 000 000"
          style={{ ...inputStyle, color: "#e0e0e0" }}
          autoComplete="off"
        />
      </div>
    </>
  );
}
