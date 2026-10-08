"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects";

type Item = { name: string; color: string; href: string; ext: string };

const projects: { slug: string; label: string; items: Item[] }[] = projectsData.map((p) => ({
  slug: p.id,
  label: `${p.name}/ ${p.description} ${p.emoji}`,
  items: [
    { name: "ver-proyecto", color: "#4a9eff", href: p.links.proyecto, ext: ".web"    },
    { name: "ver-proceso",  color: "#ff5f57", href: p.links.proceso,  ext: ".insta"  },
    { name: "ver-repo",     color: "#28c840", href: p.links.repo,     ext: ".github" },
  ],
}));

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number | undefined>(undefined);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.children.length === 0) return;
    const count = Math.min(2, container.children.length);
    const last = container.children[count - 1] as HTMLElement;
    setMaxH(last.offsetTop + last.offsetHeight);
  }, []);

  useEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(measure);
    for (let i = 0; i < Math.min(2, container.children.length); i++) {
      ro.observe(container.children[i]);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: 13 }}>

      {/* Scrollbar styles */}
      <style>{`
        .projects-scroll::-webkit-scrollbar { width: 4px; }
        .projects-scroll::-webkit-scrollbar-track { background: transparent; }
        .projects-scroll::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        .projects-scroll { scrollbar-width: thin; scrollbar-color: #444 transparent; }
      `}</style>

      {/* Header section — fixed, never scrolls */}
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
          Code the vibe<AnimatedDots />
        </span>
        <span style={{ color: "#555", fontSize: 12 }}>
          // abrir cada carpeta para acceder
        </span>
      </div>

      {/* Projects section — scrolls internally */}
      <div
        ref={containerRef}
        className="projects-scroll"
        style={{
          paddingInline: 20,
          maxHeight: maxH,
          overflowY: "auto",
        }}
      >
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
