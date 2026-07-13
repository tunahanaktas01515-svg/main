# MakerAI Hub

Modern, colorful 3D Printing + RC Maker AI platform.

## Features

- Dark navy theme with blue / orange / red accents
- Slow-scrolling colorful side banner
- Large hero search
- 10 languages (TR, EN, DE, FR, IT, ES, RU, AR, ZH, JA)
- Auth + Basic (39 TL / 50 credits) & Premium (79 TL / 250 credits)
- First user or `tunahanaktas01515@gmail.com` becomes admin
- Admin panel: users, content approval, reports, site settings
- STL / STEP / F3D AI analysis (simulated)
- Model search with filters (redirect-only downloads)
- Model compare + AI chat

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo admin

- Email: `tunahanaktas01515@gmail.com`
- Password: `admin123`

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Client-side auth/session via localStorage (demo / prototype layer)
- Files are never hosted — download buttons always redirect to original sites
