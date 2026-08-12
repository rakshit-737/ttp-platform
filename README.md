# TTP — Teacher Training Programme

Learn Business. Work on Real Projects. Think Like a Founder.

Interactive preview of the TTP learning platform: courses with quizzes and assignments, simulated ₹ checkout, real startup projects with TTP-controlled allocation, task deadlines with mentor feedback, a participant dashboard and certificate previews. All flows run client-side (localStorage) — no backend, no real payments. The production site is built in WordPress per the TTP Implementation Guide; this app exists to share a working, clickable vision of it.

## Stack

- Vite + React 18 + TypeScript (strict)
- React Router (hash routing — works on any static host)
- Tailwind CSS (utilities only) + a hand-written design system in `src/index.css`
- framer-motion + lucide-react (animated hero in `src/components/ui/prisma-hero.tsx`)
- `vite-plugin-singlefile` — the production build is one self-contained HTML file

## Structure

```
assets/              favicon
src/
  components/        Header, Footer, Modal, CourseCard, ProjectDossier
    ui/              prisma-hero.tsx (WordsPullUp, TTPHero, PrismaHero)
  data/              courses, projects, mentors (typed catalogue data)
  pages/             Home, Courses, CourseDetail, Projects, ProjectDetail,
                     HowItWorks, Mentors, About, Contact, Auth, Dashboard
  App.tsx            routes + layout
  store.tsx          app state (context + localStorage) and toasts
  types.ts           shared types
  index.css          design tokens and component styles
```

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + build → dist/index.html (single file)
```

## Deploy

**Google AI Studio (Apps):** create an app, replace its files with this repo's (or simply paste the contents of `dist/index.html` after `npm run build` — it is fully self-contained), then deploy and share the link.

**Anywhere static** (Netlify, Vercel, GitHub Pages): serve `dist/`. Hash routing means no server rewrites are needed.

## Demo shortcuts

- **Login → "Preview as demo participant"** — sample account: Startup Fundamentals complete (certificate preview), Digital Marketing at 60%, allocated to the ABC EdTech project at 45% with one task reviewed and one awaiting review.
- **Buy Now** on any course → simulated Razorpay checkout (clearly labelled; no card fields) → course lands in the dashboard.
- **Real Projects → ABC EdTech** → allocation password `ttp-abc` (the guide's free Method A, demonstrated).

`legacy/single-file-preview.html` is the earlier hand-written single-file version, kept for reference.
