# Fortuna Frontend

React-based web application for Fortuna, a video content platform where creators sell exclusive access to content directly to fans using Solana blockchain payments.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: MobX (class-based stores with observers)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with dark mode support
- **HTTP Client**: Axios
- **Blockchain**: Solana Web3.js
- **Auth**: Email/password + Google OAuth
- **Build**: Create React App (react-scripts)

## Quick Start

```bash
npm install        # Install dependencies
npm start          # Start dev server
npm run build      # Production build
npm run lint       # Run ESLint
npm run type-check # TypeScript check
npm run validate   # Lint + type-check
```

## Project Structure

```
src/
├── App.tsx                 # Root component with routes and global hooks
├── index.tsx               # Entry point with context providers
├── context-level-component.tsx  # Provider wrapper hierarchy
│
├── classes/                # HTTP client class
├── components/             # React UI components (229 files)
├── contexts/               # MobX stores exposed via React Context
├── hooks/                  # Custom React hooks (60+ files)
├── pages/                  # Route page components
├── routes/                 # Nested route definitions
├── services/               # API data service classes
├── styles/                 # Global CSS
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Architecture Overview

### Data Flow

```
User Action → Hook (callback) → Service (API call) → Context (MobX store) → Component (observer)
```

1. **Pages** compose components and call hooks
2. **Hooks** encapsulate logic (fetching, handlers, computed values)
3. **Services** make HTTP requests via FortunaHttpClient
4. **Contexts** hold MobX observable state
5. **Components** render UI, wrapped with `observer()` for reactivity

### State Management (MobX)

Each context contains a class-based MobX store:

```typescript
class ExampleClass {
  constructor() {
    makeAutoObservable(this)
  }
  // observable properties and actions
}

const ExampleContext = createContext(new ExampleClass())
export const useExampleContext = () => useContext(ExampleContext)
```

Components reading from stores must be wrapped with `observer()`.

### API Services

Services are instantiated in `FortunaApiClientContext` and injected with `FortunaHttpClient`:

```typescript
const { authDataService, videoDataService } = useApiClientContext()
```

## Key Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing with search, creators, videos |
| `/v/:videoUUID` | Video | Video player with purchase options |
| `/c/:creatorUsername` | Creator | Creator profile and videos |
| `/s/:searchTerm` | Search | Search results |
| `/hashtag/:tag` | Hashtag | Videos by tag |
| `/login` | Login | Authentication |
| `/register` | Register | New account |
| `/wallet` | Wallet | Balance and transactions |
| `/ownership` | Ownership | Purchased content |
| `/creator/studio` | Studio | Creator dashboard |
| `/creator/create-content` | Create | Upload new video |

## Conventions

### File Naming
- Components/Pages: `kebab-case.tsx`
- Hooks: `use-*` or `*-use-effect.ts`
- Services: `*-data-service.ts`
- Types: `*.d.ts`

### Component Pattern
```typescript
interface Props {
  // typed props
}

function ComponentName(props: Props) {
  // hooks first
  const context = useSomeContext()

  // early returns for loading/error states
  if (loading) return <Loading />

  // render
  return <div className="dark:text-white">...</div>
}

export default observer(ComponentName)  // if reading MobX state
```

### Hook Pattern
```typescript
export default function useExampleHook(param: Type): ReturnType {
  const apiClient = useApiClientContext()
  const context = useSomeContext()

  return useCallback(async () => {
    try {
      // logic
    } catch (error) {
      setErrorAxiosResponse(error, setError)
    }
  }, [dependencies])
}
```

## Directory Documentation

Each `src/` subdirectory contains its own `CLAUDE.md` with detailed documentation:

- [src/classes/CLAUDE.md](src/classes/CLAUDE.md) - HTTP client
- [src/components/CLAUDE.md](src/components/CLAUDE.md) - UI components
- [src/contexts/CLAUDE.md](src/contexts/CLAUDE.md) - MobX stores
- [src/hooks/CLAUDE.md](src/hooks/CLAUDE.md) - Custom hooks
- [src/pages/CLAUDE.md](src/pages/CLAUDE.md) - Route pages
- [src/services/CLAUDE.md](src/services/CLAUDE.md) - API services
- [src/types/CLAUDE.md](src/types/CLAUDE.md) - Type definitions
- [src/utils/CLAUDE.md](src/utils/CLAUDE.md) - Utility functions

## Environment Variables

Create `.env` from `.env.sample`:

```
REACT_APP_API_URL=<backend API URL>
```

## Key Patterns to Know

1. **Global Types**: Types in `src/types/*.d.ts` are globally available (no imports needed)
2. **Dark Mode**: Always include `dark:` Tailwind variants for colors
3. **MobX Observers**: Any component reading context state needs `observer()` wrapper
4. **Auth Header**: `FortunaHttpClient` auto-injects auth token; use `"No-Auth-Required"` header for public endpoints
5. **Type Guards**: Use guards from `src/utils/type-checks.ts` for response type narrowing
6. **Branded Types**: `AtPrefixedString` enforces `@` prefix on usernames
