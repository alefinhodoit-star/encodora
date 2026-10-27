# AI_RULES.md

## Tech Stack

- **React 18** with TypeScript support via `@types/react` and `@types/react-dom`.
- **Vite** as the build tool and development server, with `@vitejs/plugin-react` for fast refresh.
- **React Router** (`react-router-dom`) for client-side routing; keep all routes defined in `src/App.tsx`.
- **Tailwind CSS** for styling, configured via `tailwind.config.js` and `postcss.config.js`, with `tailwind-merge` and `tailwindcss-animate` for utility merging and animations.
- **shadcn/ui** components (Radix UI primitives) are pre-installed; use them for UI building blocks like buttons, dialogs, dropdowns, and tooltips.
- **Radix UI** provides accessible, unstyled primitives (`@radix-ui/react-*`) used by shadcn/ui.
- **React Query** (`@tanstack/react-query`) for server-state management and data fetching.
- **React Hook Form** with `@hookform/resolvers` and **Zod** for form validation and handling.
- **Lucide React** for icons; **Framer Motion** for animations and transitions.

## Library Usage Rules

- **UI components**: Prefer shadcn/ui components for standard UI patterns (buttons, modals, selects, etc.). Do not edit shadcn component files directly; create new components if customization is needed.
- **Styling**: Use Tailwind CSS utility classes exclusively. Avoid custom CSS unless absolutely necessary. Use `tailwind-merge` when composing class names.
- **Icons**: Import icons from `lucide-react`. Do not use inline SVGs unless a custom icon is required.
- **Routing**: Use `react-router-dom` for all navigation. Define routes in `src/App.tsx` and use `<Link>` for internal navigation.
- **Data fetching**: Use `@tanstack/react-query` for any server data. Do not use `useEffect` for data fetching.
- **Forms**: Use `react-hook-form` with `@hookform/resolvers` and Zod schemas for validation. Avoid uncontrolled components.
- **State management**: Use React's built-in `useState`/`useReducer` for local component state. Use React Query for server state. Avoid Redux or Zustand unless explicitly needed.
- **Animations**: Use `framer-motion` for interactive animations and `tailwindcss-animate` for simple CSS-based animations.
- **Date handling**: Use `date-fns` for date manipulation. Avoid `moment` for new code.
- **Charts**: Use `recharts` for data visualization.
- **Notifications**: Use `sonner` or `react-hot-toast` for toast notifications.
- **Markdown rendering**: Use `react-markdown` for rendering markdown content.
- **Editors**: Use `react-quill-new` for rich text editing.