# Smoker Heap — Setup Guide

## 1. Install dependencies
```bash
npm install
```

## 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

### Get your DATABASE_URL (Neon):
1. Go to neon.tech → Sign up → Create project
2. Copy the connection string → paste as DATABASE_URL

### Get Clerk keys:
1. Go to clerk.com → Sign up → Create application
2. Copy Publishable Key + Secret Key

### Get Stripe keys:
1. Go to stripe.com → Developers → API Keys
2. Copy Publishable Key + Secret Key

## 3. Push database schema
```bash
npm run db:push
npm run db:generate
```

## 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

## 5. Deploy to Vercel
```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — GitHub (recommended)
# 1. Push to GitHub repo
# 2. Go to vercel.com → New Project → Import repo
# 3. Add all env variables from .env.local in Vercel dashboard
# 4. Deploy
```

## 6. Add products (Admin panel — coming next)
After deployment, visit `/admin` to:
- Add categories and brands
- Add products with variants/flavors
- Manage orders

## Pages built
- `/`               → Homepage (hero, categories, carousels)
- `/category/[slug]` → Category listing with filters
- `/product/[slug]`  → Product detail with flavor table
- `/cart`           → Shopping cart
- `/search`         → Search results
- `/wishlist`       → Saved wishlist

## Next to build
- [ ] Checkout page (Stripe)
- [ ] Account / Orders page
- [ ] Admin dashboard
- [ ] Brand pages (/brand/[slug])
