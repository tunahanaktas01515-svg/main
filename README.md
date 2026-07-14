# MakerAI Hub

An advanced, AI-powered **3D printing platform** built with **Next.js**. Upload an
STL, STEP or F3D model — or paste a link — and MakerAI estimates filament usage,
recommends the best material, previews the final look, suggests colors, tunes your
slicer settings and grades your project's printability in seconds.

> This repository is a high-fidelity front-end demo. The AI analysis is
> deterministically simulated on the client so the product is fully explorable
> without any API keys or backend.

## ✨ Features

- **Model analysis** — filament weight, print time, dimensions & complexity for STL / STEP / F3D.
- **Filament advisor** — best material (PLA, PETG, ABS, TPU) with reasoning.
- **Color & look preview** — predicted appearance plus curated color palettes.
- **Link intelligence** — analyze products from a pasted link (Thingiverse, Printables, …).
- **Chat history import** — bring conversations from Gemini, ChatGPT or Grok for project assessment.
- **Printer tuning** — slicer settings tailored to your printer + imaginative model ideas.
- **Subscription system** — Standard (free) vs Premium with real quota enforcement.
- **10 languages** — EN, TR, DE, ES, FR, IT, PT, RU, ZH, JA with a live switcher.
- **Futuristic dark UI** — blue / orange / red accents, glassmorphism and glow.

## 📦 Subscription plans

| Capability                    | Standard (Free) | Premium     |
| ----------------------------- | --------------- | ----------- |
| AI chat messages / month      | 10              | Unlimited   |
| External chat history imports | 2               | Unlimited   |
| STL / STEP / F3D analyses     | 4               | Unlimited   |
| Saved chat histories          | 15              | Unlimited   |
| Cloud storage                 | 2 GB            | 250 GB      |
| Advanced features & priority  | —               | ✓           |

Quotas are enforced client-side via `SubscriptionContext` and persist in
`localStorage`. Switching plans on the **Pricing** page instantly unlocks
unlimited usage across the app.

## 🗂️ Pages

- `/` — **Home**: hero, feature grid, how-it-works and call to action.
- `/analyze` — **STL Analysis**: drag-and-drop upload or link input with a full AI report.
- `/pricing` — **Subscription**: plan comparison, billing toggle and FAQ.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production server
- `npm run lint` — lint the project

## 🧱 Tech stack

- [Next.js](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- Zero external UI dependencies — icons and the 3D hero visual are hand-built.

## 📁 Project structure

```
src/
  app/
    layout.tsx          # Root layout, providers, header & footer
    page.tsx            # Home page
    analyze/page.tsx    # STL / STEP / F3D analysis
    pricing/page.tsx    # Subscription plans
    globals.css         # Futuristic dark theme
  components/           # Header, Footer, icons, hero visual, language switcher
  context/              # Language & subscription providers
  lib/                  # i18n (10 languages), plans, analysis engine, types
```
update
