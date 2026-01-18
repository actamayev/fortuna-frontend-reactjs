# Fortuna Frontend

A React-based web application for Fortuna — a video content platform where creators sell exclusive access to their content directly to fans using Solana blockchain payments.

## Features

- **Video Streaming**: Browse and watch video content from creators
- **Exclusive Content**: Purchase tiered access to exclusive videos using SOL
- **Creator Studio**: Upload videos, set pricing tiers, manage content
- **Wallet Integration**: Deposit, withdraw, and transfer SOL
- **Search**: Find videos by title, creator, or hashtag
- **User Accounts**: Email/password and Google OAuth authentication
- **Dark Mode**: Full dark/light theme support

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Language | TypeScript |
| State Management | MobX |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Blockchain | Solana Web3.js |
| Authentication | Email/Password, Google OAuth |
| Build Tool | Create React App |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fortuna-frontend-reactjs

# Install dependencies
npm install

# Create environment file
cp .env.sample .env
# Edit .env with your configuration
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API base URL |

### Development

```bash
# Start development server
npm start
```

The app will be available at `http://localhost:3000`.

### Production Build

```bash
# Create optimized production build
npm run build
```

Build output will be in the `build/` directory.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run type-check` | Run TypeScript type checking |
| `npm run validate` | Run lint + type-check |
| `npm run update-dependencies` | Update all dependencies |

## Project Structure

```
src/
├── App.tsx              # Root component with routes
├── index.tsx            # Entry point
├── classes/             # HTTP client
├── components/          # React UI components
├── contexts/            # MobX state stores
├── hooks/               # Custom React hooks
├── pages/               # Route page components
├── routes/              # Nested route definitions
├── services/            # API service classes
├── styles/              # Global CSS
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## Architecture

The application follows a layered architecture:

```
Pages → Hooks → Services → API
          ↓
       Contexts (MobX)
          ↓
      Components
```

- **Pages**: Route-level components that compose the UI
- **Hooks**: Encapsulate business logic, data fetching, and side effects
- **Services**: Handle HTTP communication with the backend API
- **Contexts**: MobX stores providing reactive global state
- **Components**: Reusable UI elements wrapped with MobX `observer()`

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with search and video listings |
| `/v/:videoUUID` | Video player page |
| `/c/:creatorUsername` | Creator profile page |
| `/s/:searchTerm` | Search results |
| `/hashtag/:tag` | Videos by hashtag |
| `/wallet` | User wallet and transactions |
| `/ownership` | Purchased content library |
| `/creator/studio` | Creator dashboard |
| `/creator/create-content` | Upload new video |

## Documentation

For detailed technical documentation, see [CLAUDE.md](CLAUDE.md).

Each source directory also contains its own documentation:
- `src/classes/CLAUDE.md`
- `src/components/CLAUDE.md`
- `src/contexts/CLAUDE.md`
- `src/hooks/CLAUDE.md`
- `src/pages/CLAUDE.md`
- `src/services/CLAUDE.md`
- `src/types/CLAUDE.md`
- `src/utils/CLAUDE.md`
