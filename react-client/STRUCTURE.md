# Recommended File Structure for React Client

This document outlines the recommended file and folder structure for the Next.js React client application.

## Complete Structure

```
src/
├── app/                          # App Router (Pages & API)
│   ├── (auth)/                   # Auth Route Group
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   ├── forgot-password/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   └── signup/
│   │   │       └── route.ts
│   │   └── users/
│   │       └── route.ts
│   ├── dashboard/                # Protected Dashboard Areas
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── home/
│   │   └── page.tsx
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Landing Page
│   ├── globals.css               # Global Styles
│   └── favicon.ico
│
├── components/                   # Reusable UI Components
│   ├── auth/
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── dashboard/
│   │   ├── Widgets/
│   │   │   ├── Widget1.tsx
│   │   │   ├── Widget2.tsx
│   │   │   └── Widget3.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Input.tsx
│
├── hooks/                        # Custom Hooks
│   ├── useAuth.ts
│   └── useForm.ts
│
├── lib/                          # Libraries & Utilities
│   ├── apiClient.ts
│   ├── auth.ts
│   └── validators.ts
│
├── services/                     # External API Services
│   └── authService.ts
│
├── types/                        # TypeScript Definitions
│   └── user.ts
│
├── contexts/                     # React Context Providers (Optional)
│   └── AuthContext.tsx
│
├── constants/                    # App-wide Constants (Optional)
│   └── index.ts
│
└── middleware.ts                 # Next.js Middleware (Auth Protection)
```

## Structure Guidelines

### 1. App Router (`app/`)
- **Route Groups**: Use parentheses `(auth)` to organize routes without affecting URL structure
- **API Routes**: Place in `app/api/` following RESTful conventions
- **Layouts**: Use `layout.tsx` for shared UI across route segments
- **Pages**: Use `page.tsx` for route endpoints

### 2. Components (`components/`)
- **Feature-based**: Organize by feature/domain (auth, dashboard, ui)
- **Reusability**: Place truly reusable components in `ui/`
- **Co-location**: Keep component-specific files (styles, tests) nearby

### 3. Hooks (`hooks/`)
- Custom React hooks for shared logic
- Prefix with `use` (e.g., `useAuth`, `useForm`)

### 4. Lib (`lib/`)
- Utility functions and helpers
- Third-party library configurations
- Pure functions with no side effects

### 5. Services (`services/`)
- External API communication
- Business logic that interacts with backend
- Data transformation and API calls

### 6. Types (`types/`)
- TypeScript type definitions
- Interfaces and type aliases
- Shared type exports

### 7. Optional Additions
- **Contexts**: React Context providers for global state
- **Constants**: App-wide constants and configuration
- **Middleware**: Next.js middleware for route protection

## Best Practices

1. **Co-location**: Keep related files together
2. **Barrel Exports**: Use `index.ts` files for cleaner imports
3. **Naming Conventions**: 
   - Components: PascalCase (e.g., `LoginForm.tsx`)
   - Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
   - Utilities: camelCase (e.g., `apiClient.ts`)
4. **Route Protection**: Use middleware.ts for authentication checks
5. **Type Safety**: Leverage TypeScript throughout

