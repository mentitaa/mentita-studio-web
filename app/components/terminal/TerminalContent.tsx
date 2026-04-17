"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { name: string; color: string; href: string; ext: string };

const projects: { slug: string; label: string; items: Item[] }[] = [
  {
    slug: "treno",
    label: "Treno /SaaS para gimnasios 💪",
    items: [
      { name: "ver-proyecto", color: "#4a9eff", href: "https://treno-web-opal.vercel.app",              ext: ".web"    },
      { name: "ver-proceso",  color: "#ff5f57", href: "https://www.instagram.com/mentita.studio/",      ext: ".insta"  },
      { name: "ver-repo",     color: "#28c840", href: "https://github.com/mentitaa/treno-web",          ext: ".github" },
    ],
  },
  {
    slug: "anora",
    label: "Anora /E-commerce de ropa 👗",
    items: [
      { name: "ver-proyecto", color: "#4a9eff", href: "https://anorashop.vercel.app",                  ext: ".web"    },
      { name: "ver-proceso",  color: "#ff5f57", href: "https://www.instagram.com/mentita.studio/",      ext: ".insta"  },
      { name: "ver-repo",     color: "#28c840", href: "https://github.com/mentitaa/depo-store",         ext: ".github" },
    ],
  },
];

const DOT_STATES = [".", "..", "..."];

function AnimatedDots() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % DOT_STATES.length);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      {DOT_STATES[index]}
    </motion.span>
  );
}

function FolderSection({
  label,
  items,
  isLast,
}: {
  label: string;
  items: Item[];
  isLast: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        paddingBlock: 16,
        borderBottom: isLast ? "none" : "1px solid #333",
      }}
    >
      {/* Folder header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" fill="#00c896" style={{ flexShrink: 0 }}>
          <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
        </svg>
        <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 500, flex: 1 }}>
          {label}
        </span>
        <span style={{ color: "#666", fontSize: 11 }}>{open ? "▼" : "▶"}</span>
      </button>

      {/* Expanded items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 8,
                marginLeft: 6,
                paddingLeft: 16,
                borderLeft: "1px solid #444",
              }}
            >
              {items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1 hover:opacity-75 transition-opacity no-underline"
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "#e0e0e0", fontSize: 13, flex: 1 }}>
                    {item.name}
                  </span>
                  <span style={{ color: "#555", fontSize: 12 }}>{item.ext}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TerminalContent() {
  return (
    <div style={{ fontFamily: "monospace", fontSize: 13 }}>

      {/* Header section */}
      <div
        style={{
          padding: 20,
          borderBottom: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#28c840" }}>acceso concedido</span>
        </div>
        <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 14 }}>
          Feel the vibe<AnimatedDots />
        </span>
        <span style={{ color: "#555", fontSize: 12 }}>
          // abrir cada carpeta para acceder
        </span>
      </div>

      {/* Projects section */}
      <div style={{ paddingInline: 20 }}>
        {projects.map((p, i) => (
          <FolderSection
            key={p.slug}
            label={p.label}
            items={p.items}
            isLast={i === projects.length - 1}
          />
        ))}
      </div>

    </div>
  );
}
