# Next.js Dashboard

A full-stack dashboard application built with [Next.js](https://nextjs.org/) (App Router) for managing invoices and customers. It features authentication, a PostgreSQL-backed data layer, and a responsive UI styled with Tailwind CSS.

## Features

- **Authentication** — Email/password login powered by [NextAuth.js](https://authjs.dev/) v5 with middleware-protected routes.
- **Invoice management** — Create, edit, and delete invoices with form validation ([Zod](https://zod.dev/)).
- **Customer directory** — Browse customers with summary metrics (total invoices, pending, paid).
- **Dashboard overview** — Revenue chart and latest-invoice feed at a glance.
- **Search & pagination** — Filter invoices by keyword with paginated results.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, Server Components & Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (via the [`postgres`](https://github.com/porsager/postgres) library) |
| Auth | NextAuth.js v5 (Credentials provider, bcrypt) |
| Testing | Vitest, React Testing Library, happy-dom |
| Linting | ESLint (eslint-config-next) |
| Package manager | pnpm |

## Prerequisites

- **Node.js** — v18.18 or later ([download](https://nodejs.org/))
- **pnpm** — v8 or later (`npm install -g pnpm`)
- **PostgreSQL** — A running PostgreSQL instance (local or hosted, e.g. [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example env file and fill in the values:

```bash
cp .env.example .env
```

The key variables to set are:

| Variable | Description |
|---|---|
| `POSTGRES_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | A random secret for NextAuth.js (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | Auth callback URL — use `http://localhost:3000/api/auth` for local dev |

> See `.env.example` for the full list of database-related variables.

### 3. Seed the database

Open [http://localhost:3000/seed](http://localhost:3000/seed) in your browser after starting the dev server (next step). This hits the seed API route which creates the required tables (`users`, `customers`, `invoices`, `revenue`) and populates them with sample data.

### 4. Run the development server

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server (Turbopack) |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests once with Vitest |
| `pnpm test:watch` | Run tests in watch mode |

## Project Structure

```
├── app/
│   ├── dashboard/          # Protected dashboard pages
│   │   ├── (overview)/     # Dashboard home (revenue chart, latest invoices)
│   │   ├── customers/      # Customer listing
│   │   └── invoices/       # Invoice CRUD pages
│   ├── lib/                # Shared utilities, data-fetching, type definitions
│   ├── login/              # Login page
│   ├── query/              # Raw query playground route
│   ├── seed/               # Database seed API route
│   └── ui/                 # Reusable UI components
├── public/                 # Static assets (images, favicon)
├── auth.ts                 # NextAuth.js configuration & providers
├── auth.config.ts          # Auth route/callback config
├── middleware.ts            # Route protection middleware
└── next.config.ts          # Next.js configuration
```

## Learn More

This project is based on the [Next.js Learn Dashboard Course](https://nextjs.org/learn). Refer to the course curriculum for a guided walkthrough of the codebase.
