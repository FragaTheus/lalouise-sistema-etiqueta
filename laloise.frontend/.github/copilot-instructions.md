# LaLouise Frontend - AI Coding Agent Instructions

## Project Overview

Next.js 16 label management frontend for the LaLouise account/user management system. Stack: React 19, TypeScript, TailwindCSS, Shadcn/UI, React Hook Form, Zustand, React Query, Zod validation.

## Architecture

### State Management

- **Zustand** (`src/hooks/use-auth-store.ts`): Persistent user auth state with localStorage
- **React Query**: Server state management via `QueryClientProvider` in `src/app/providers/providers.tsx`
- **React Hook Form + Zod**: Client-side form validation
- **Nuqs**: URL state for pagination/filtering that survives page refresh

### API Layer (`src/api/`)

- Axios instance: `baseURL="http://localhost:8080/api/v1"`, credentials enabled
- Global error interceptor logs and rejects errors
- Pattern: API function → React Query mutation in custom hook → toast notification on error/success

### Form Architecture

- Generic `<AppForm<TSchema>>` component accepts Zod schema, field configs, React Query mutation
- Field metadata from JSON (`src/constants/loginTextContent.json`) enables i18n and reusability
- React Hook Form with `onBlur` validation mode
- Validation errors mapped to `FormFieldError` UI components
- Example: `loginFields` + `loginSchema` define complete form behavior and error messages

### Layouts

- **App Dashboard**: Centered responsive layout (`src/components/layouts/app-dashboard-layout/`)
- **Sidebar**: Radix UI with header (`src/app/painel/layout.tsx`) - inherited by protected routes
- Nested routing: `/painel/contas/[id]` follows Next.js App Router pattern

## Developer Workflows

### Commands

```bash
pnpm dev      # Dev server on http://localhost:3000
pnpm build    # Type-check + bundle
pnpm lint     # ESLint
```

### Adding a Feature

1. **API**: Add function to `src/api/api.*.ts` with error handling
2. **Hook**: Create `src/hooks/use-{feature}.ts` using `useMutation` + error toast (see `useLogin` pattern)
3. **Forms**: Define in `src/constants/form-fields/` + schema in `src/constants/schemas/`
4. **Route**: Add `.tsx` in `src/app/` tree; mark `"use client"` if using hooks/interactivity

## Conventions

### Form & Validation

- Always use Zod; error messages from JSON i18n file, never hardcoded
- Field type from config drives input UI
- `extractErrorMessage(error)` converts Axios errors for user display

### Error Handling

- API errors caught globally, logged to console
- Sonner toast: `toast.success()`, `toast.error()` (auto top-right, 3s duration)

### File Naming

- Components: `app-{feature}.tsx` or folder structure
- Hooks: `use-{feature}.ts`
- API: `api.{resource}.ts`
- Types: inline or `*-types.ts` files

### Component Types

- Mark `"use client"` for hooks, browser APIs, interactivity
- Layouts/pages default Server Components
- Providers wrapper is client component

## Key Files

- `src/app/providers/providers.tsx` — React Query + Nuqs setup
- `src/api/api.ts` — Axios config and interceptors
- `src/hooks/use-auth-store.ts` — Auth state; check for logged-in user
- `src/constants/form-fields/` — Reusable form field configs
- `src/constants/schemas/` — Zod schemas paired with form fields
- `src/components/ui/` — Shadcn UI components
- `src/app/painel/` — Protected dashboard routes

## Integration

- Backend API: `http://localhost:8080/api/v1`
- Login response: `{id, nickname, role}`
- CORS/credentials enabled on client
- No env vars yet—hardcoded API URL (update if needed for environments)
