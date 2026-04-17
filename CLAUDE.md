@AGENTS.md

# Mentita Studio — Web Portfolio

## Proyecto
Web pública de Mentita Studio, un vibe coding studio unipersonal.
Deploy: https://mentitastudio.vercel.app
Repo: https://github.com/mentitaa/mentita-studio-web

## Stack
- Next.js + TypeScript + Tailwind + Framer Motion
- Deploy: Vercel (auto-deploy en cada push a main)

## Estructura
- app/components/terminal/ → TerminalWindow, TerminalTitleBar, TerminalContent
- public/ → bgms.png (fondo), favicon.ico y PNGs del favicon

## Proyectos en la terminal
- Treno / SaaS para gimnasios → https://treno-web-opal.vercel.app
- Anora / E-commerce de ropa → https://anorashop.vercel.app

## Reglas
- Sin over-engineering
- Animaciones con propósito
- Agregar proyectos debe ser trivial (solo editar TerminalContent.tsx)
- Siempre hacer push después de cada cambio
