# comaz-frontpage

Marketing site for CoMaz OS — the platform behind [MOT-backend](../MOT-backend) /
[MOT-frontend](../MOT-frontend). Three pages (Landing, About, Pricing); the top bar's
"Open the app" button links out to the product at `app.comaz.co.uk`.

## Stack

- React + TypeScript, built with Vite
- Tailwind CSS v4
- React Router

## Running

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

```bash
npm run lint       # oxlint
npm run typecheck  # tsc -b
npm run build      # production build
```

## Project structure

```text
src/
├── components/   Navbar, Footer, Logo, shared icons
├── pages/        Landing.tsx, About.tsx, Pricing.tsx
└── lib/          constants (app URL, etc.)
```

## Notes for whoever edits this next

- Pricing tiers in [`src/pages/Pricing.tsx`](src/pages/Pricing.tsx) show "Enquire" instead of a
  price for now — every CTA there mails `support@comaz.co.uk`. Swap in real numbers once pricing
  is finalised.
- The app URL and support email live in one place: [`src/lib/constants.ts`](src/lib/constants.ts).
