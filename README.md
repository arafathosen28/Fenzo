# Fenzo — Next.js + Firebase (Glass UI)

A premium glassmorphism e‑commerce starter for **Fenzo** (clothing). Includes:
- Next.js (App Router) + TypeScript + Tailwind
- Firebase (Auth for admins, Firestore, Storage)
- Cloud Functions (createOrder with WhatsApp redirect, bKash/Nagad webhook skeletons)
- Admin panel skeleton (Products/Orders)
- Strict security rules & indexes
- WhatsApp handoff and local Bangladesh-friendly flows

## Quick Start
```bash
# 1) Install deps
pnpm i

# 2) Copy envs
cp .env.local.example .env.local
# Fill Firebase + secrets

# 3) Dev
pnpm dev

# 4) Functions (in ./functions)
cd functions && pnpm i && pnpm build && pnpm serve
# Or deploy: pnpm deploy
```

## Scripts
- `pnpm dev` - run Next in dev
- `pnpm build` - build
- `pnpm start` - start
- `pnpm lint` - lint

## WhatsApp Numbers
- +8801983268976 → wa.me/8801983268976
- +880718585937  → wa.me/880718585937
Facebook: fenzo5
