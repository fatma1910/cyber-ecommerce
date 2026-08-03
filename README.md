# Cyber

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-443E38)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-111827)
![next-intl](https://img.shields.io/badge/next--intl-Localization-6B7280)
Cyber is a localized e-commerce storefront built with the Next.js App Router. It supports product browsing, filtering, product details, cart and wishlist management, checkout, reviews, and multilingual UI.

---

## Demo

- Live Demo: `https://cyber-ecommerce-pearl.vercel.app/en`
- Repository: `https://github.com/fatma1910/cyber-ecommerce`
---

## Features

- Home page with hero, categories, featured products, discounts, and sale sections.
- Shop catalog with category, subcategory, and price filtering.
- Sorting and pagination in the shop page.
- Dynamic product detail pages with slug-based routing.
- Product image gallery with mobile Swiper support.
- Variant selection before adding products to the cart.
- Cart and wishlist with persisted Zustand state.
- Checkout flow with React Hook Form and Zod validation.
- Shipping fee calculation based on selected Egyptian city.
- Product reviews with rating, validation, and toast feedback.
- About and contact pages.
- English and Arabic localization with RTL/LTR support.
- Empty states, loading states, error handling, and a not-found page.

---



## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- next-intl
- shadcn/ui
- `@base-ui/react`
- React Hook Form
- Zod
- Sonner
- Swiper
- Lucide React
- React Icons
- Fetch API

---

## Project Structure

- `app/` - App Router pages, layouts, and metadata
- `app/[locale]/(pages)/` - Home, shop, cart, checkout, wishlist, about, contact, and thank-you pages
- `components/layout/` - Header and footer
- `components/shared/` - Shared product components
- `components/ui/` - Reusable UI primitives
- `lib/` - API helpers, constants, types, and validation schemas
- `store/` - Zustand stores
- `messages/` - English and Arabic translations
- `public/` - Static images and icons

---

## State Management

Cyber uses Zustand for two persisted stores:

- `useCartStore` for cart items, quantities, totals, and tax
- `useWishlistStore` for saved products

Both stores use `persist` middleware so data stays after refresh.

---

## API Integration

All API calls are centralized in [`lib/data.ts`](./lib/data.ts).

- Uses the Fetch API
- Base URL comes from `NEXT_PUBLIC_BASE_URL`
- Some GET requests use `revalidate: 60`
- Main endpoints include products, categories, bundles, offers, shipping, reviews, related products, and orders
- Errors are handled with safe fallbacks and console logging

---

## Filtering

The shop filters are synchronized with URL query params.

- Category and subcategory filters
- Price range filter
- Sorting
- Pagination
- `searchParams` and `router.push()` keep the UI in sync without a full refresh

---

## SEO

- Global metadata in the root layout
- Route-level metadata for major pages
- Dynamic product metadata from the product name and description
- Semantic HTML

---

## Responsive Design

The UI is responsive for desktop, laptop, tablet, and mobile.

- Mobile navigation drawer
- Mobile filter dialog
- Responsive product grid
- Responsive checkout and cart layouts

---

## Internationalization

Cyber uses `next-intl` with:

- English and Arabic translations
- Locale-prefixed routing
- RTL/LTR switching based on locale
- Localized metadata

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Base URL used for API requests |

---

## Installation

```bash
git clone <your-repo-url>
cd e-commerce-frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_BASE_URL` in `.env` if needed.

---

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Author

**Fatma Saleh**  
Frontend Developer

- LinkedIn: `https://www.linkedin.com/in/fatma-saleh-77497b249/`
- GitHub: `https://github.com/fatma1910`
- Portfolio: `https://portfolio-beta-mauve-86.vercel.app/`
