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
- app/components/terminal/TerminalWindow.tsx → shell + animación de entrada
- app/components/terminal/TerminalTitleBar.tsx → dots + título
- app/components/terminal/TerminalContent.tsx → proyectos con file tree
- app/components/terminal/ContactView.tsx → formulario de contacto
- app/api/contact/route.ts → API que guarda en Notion
- public/bgms.png → fondo desktop
- public/bgms-mobile.png → fondo móvil
- public/logo.svg → logo estático encima de la terminal
- public/og-image.png → imagen para preview en redes

## Proyectos en la terminal
- Treno/ SaaS para gimnasios 💪 → https://treno-web-opal.vercel.app
- Anora/ E-commerce de ropa 👗 → https://anorashop.vercel.app

## Variables de entorno
- NOTION_TOKEN → token de integración de Notion
- Database ID contactos: 3c5f0d37d11c4d8896dd3885f3da4ffa

## Reglas
- Sin over-engineering
- Animaciones con propósito
- Agregar proyectos: solo editar TerminalContent.tsx
- Siempre hacer push después de cada cambio
