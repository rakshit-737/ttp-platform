# TTP — Teacher Training Programme (interactive preview)

Single-file website preview of the TTP platform (`index.html`). No build step, no dependencies — open it in any browser.

Implements the PRD/Implementation Guide: exact menu, hero copy, four differentiator cards, Popular Courses, journey strip, course catalogue with search + category filter, course detail pages (all §11 items), Real Projects with the ABC EdTech worked example, allocation gate (Method A password demo: `ttp-abc`), tasks with deadlines + submission + mentor feedback, mentors page, About/Contact copy verbatim, participant dashboard (§15/§16), certificate preview (§19 fields).

All flows are simulated in the browser (localStorage). No real payments — checkout is clearly labelled a simulation. The production site is built in WordPress per the Implementation Guide; this preview exists to share a working link.

## Deploy in Google AI Studio (Apps)

1. Open https://aistudio.google.com → **Apps** (Build).
2. Create a new app; delete the generated files it doesn't need and paste the entire contents of `index.html` into the app's `index.html` (replace everything).
3. Press the deploy/share button (Cloud Run deploy) and copy the public link.

Works equally on Netlify Drop / Vercel / GitHub Pages — it is one static file.

## Demo shortcuts (for whoever gets the link)

- **Login → "Preview as demo participant"** — loads a sample account: Startup Fundamentals complete (certificate preview), Digital Marketing 60%, allocated to ABC EdTech at 45% with one task reviewed and one awaiting review.
- **Buy Now** on any course → simulated Razorpay checkout → course appears in dashboard.
- **Real Projects → ABC EdTech** → allocation password `ttp-abc` (Method A from the guide).
