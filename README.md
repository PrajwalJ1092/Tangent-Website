# Tangent Studio — Architecture & Digital Marketplace

A premium contemporary architecture and interior design studio web platform with an integrated digital product marketplace. Inspired by the architectural aesthetic of [Linoxa](https://linoxa.framer.website/).

## Tech Stack & Tooling

* **Framework:** React 19 + TypeScript (Strict Mode)
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4 (native `@tailwindcss/vite` engine)
* **Animation:** Motion for React (`motion/react`)
* **Routing:** React Router v7 (`createBrowserRouter`)
* **State Management:** Custom React Context (`CartContext`) with localStorage persistence
* **Icons:** Lucide React (`lucide-react`)
* **Forms & Validation:** React Hook Form + Zod + `@hookform/resolvers`
* **Testing:** Vitest 3 + React Testing Library + `@testing-library/jest-dom` + `jsdom`
* **Linting:** ESLint 9 (Flat Config) + `typescript-eslint`

---

## Getting Started

### Prerequisites
* Node.js `>= 20` (tested on Node `v23.3.0`)
* npm `10.x`

### Installation
```bash
npm install
```

### Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Start Vite dev server (`http://localhost:5173`) |
| `build` | `npm run build` | Validate types (`tsc -b`) and bundle for production (`vite build`) |
| `preview` | `npm run preview` | Preview production build locally |
| `typecheck` | `npm run typecheck` | Run standalone TypeScript type-checking (`tsc --noEmit`) |
| `lint` | `npm run lint` | Run ESLint with flat config across `.ts` and `.tsx` files |
| `test` | `npm run test` | Run Vitest unit & integration test suites once |
| `test:watch` | `npm run test:watch` | Run Vitest test runner in interactive watch mode |

---

## Project Structure & Architecture

```
tangent-studio/
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── components/
│   │   ├── layout/         # Shell components (Navbar, Footer, RootLayout)
│   │   └── ui/             # Reusable UI primitives (Button, Badge, Card, Input)
│   ├── context/            # React contexts & custom state hooks (CartContext)
│   ├── lib/                # Utilities & formatters (cn, currency, file size)
│   ├── routes/             # Page route components (Home, Projects, Shop, Cart, etc.)
│   ├── test/               # Test configuration & RTL setup (setup.ts)
│   ├── types/              # Domain models (project, product, cart, contact)
│   ├── App.tsx             # Application root with RouterProvider
│   ├── App.test.tsx        # Shell smoke test
│   ├── index.css           # Tailwind v4 import & architectural theme base styles
│   ├── main.tsx            # DOM root entry
│   └── router.tsx          # Declarative React Router route tree
├── eslint.config.js        # ESLint 9 flat configuration
├── tsconfig.json           # Composite TypeScript references config
├── tsconfig.app.json       # App & test strict compiler options with @/* alias
├── tsconfig.node.json      # Tooling compiler options
├── vite.config.ts          # Vite configuration with Tailwind v4 & Vitest setup
└── package.json
```

---

## Engineering Conventions

### 1. Component Architecture & File Organization
* **UI Primitives (`src/components/ui/`):** Generic, accessible design system building blocks without direct business logic.
* **Layouts (`src/components/layout/`):** Structural wrappers providing persistent navigation, header, and footer.
* **Route Pages (`src/routes/`):** Route-level containers that compose sections and orchestrate data fetching and mutations.
* **Domain Types (`src/types/`):** Strict TypeScript models keeping data definitions independent of presentation.

### 2. TypeScript Guidelines
* Strict mode enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`).
* Use `interface` for extensible object contracts and `type` for unions/primitives.
* Path alias `@/*` maps to `src/*` for clean imports.

### 3. Styling & Design Tokens
* Standardized dark palette: `#0c0d0e` obsidian surface, `#121316` card elevation, `#f5f5f7` text, subtle `#262626` borders.
* Architectural accents in warm copper/amber tones (`amber-300`, `amber-950/40`).
* Dynamic class merging via `cn(...)` (`clsx` + `tailwind-merge`).

### 4. Cart & State Separation
* Cart calculations (subtotal, tax, quantity, line totals) are handled within `CartContext`, keeping presentation components decoupled from math and persistence.
* Local storage synchronization is safeguarded against SSR and quota restrictions.

### 5. Testing
* Co-locate unit tests alongside components or contexts (`*.test.tsx`).
* Use user-centric querying via `@testing-library/react` (`getByRole`, `getByText`).
