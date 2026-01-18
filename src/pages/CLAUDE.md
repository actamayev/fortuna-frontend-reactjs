# src/pages Directory

This directory contains top-level page components that correspond to application routes. Each page composes smaller components and hooks to build complete views.

## Architecture Pattern

Pages follow this structure:
1. **Hooks**: Call custom hooks for data fetching and side effects
2. **Context**: Access MobX stores via context hooks
3. **SEO**: Include `<PageHelmet>` or `<BasicHelmet>` for metadata
4. **Layout**: Compose UI from components in `src/components/`
5. **Observer**: Wrap with MobX `observer()` when reactively reading store state

## Root Pages

### home.tsx
**Route:** `/`

Landing page with search, featured creators, and video listings.

**Features:**
- Search bar for finding creators/videos
- Creator carousel
- Video grid with category filter (Recent Uploads / Most Popular)
- Dynamic min-height calculation to fill viewport

**Hooks:** `useRetrieveHomePageVideos`

---

### video.tsx
**Route:** `/v/:videoUUID`

Single video viewing page with player, purchase card, and related content.

**Features:**
- Video player (or loading/not-found states)
- Purchase exclusive access card (for paid content)
- Sub-video section (description, likes, creator info)
- "More videos" section from same creator

**Hooks:** `useSetSingleVideoUseEffect`, `useRetrieveVideoUrlDataUseEffect`, `useRetrieveCreatorVideosAndDataUseEffect`

**Note:** Wrapped with MobX `observer()` for reactive updates

---

### creator.tsx
**Route:** `/c/:creatorUsername`

Creator profile page showing their channel and video library.

**Features:**
- Creator banner and profile info
- Video grid with filtering options
- Social platform links

**Hooks:** `useRetrieveCreatorVideosAndDataUseEffect`

---

### recent-uploads.tsx
**Route:** `/recent-uploads`

Browse recently uploaded videos across all creators.

**Features:**
- Chronological video grid
- Loading states

**Hooks:** `useRetrieveRecentlyUploadedVideos`

---

### search-results.tsx
**Route:** `/search/:searchTerm`

Search results page for videos and creators.

**Features:**
- Mixed results (videos and creators)
- Loading/empty states

**Hooks:** `useSearchForVideosAndCreators`

---

### video-hashtag.tsx
**Route:** `/tag/:hashtag`

Videos filtered by a specific hashtag/tag.

**Features:**
- Tag-filtered video grid
- Loading/empty states

**Hooks:** `useRetrieveVideosByHashtag`

---

### wallet.tsx
**Route:** `/wallet`

User's wallet page for viewing balance and transactions.

**Features:**
- SOL balance display
- Transaction history
- Deposit/withdrawal UI

**Auth:** Requires login

---

### ownership.tsx
**Route:** `/ownership`

User's purchased content library.

**Features:**
- Grid of purchased exclusive videos
- Filtering/sorting options

**Auth:** Requires login

---

### missing.tsx
**Route:** `*` (404)

Fallback page for unmatched routes.

**Features:**
- "Page not found" message
- Link back to home

---

## Subdirectories

### auth/

Authentication flow pages.

**login-page.tsx**
- **Route:** `/login`
- Login form wrapper component

**register-page.tsx**
- **Route:** `/register`
- Registration form wrapper component

**register-username.tsx**
- **Route:** `/register-username`
- Username selection after OAuth registration
- Validates username availability before submission

---

### company/

Static company pages.

**contact.tsx**
- **Route:** `/contact`
- Contact form for user inquiries
- Fields: name, email, message

---

### creator/

Creator studio pages (content management).

**studio.tsx**
- **Route:** `/creator/studio`
- Creator dashboard showing published content
- Content management (edit, feature, visibility)

**create-content.tsx**
- **Route:** `/creator/create-content`
- Multi-step video upload flow
- Video file, thumbnail, metadata, pricing tiers

**Auth:** Both require creator account

---

## Organization Patterns

### File Naming
- Root pages: kebab-case matching the route concept (e.g., `recent-uploads.tsx`)
- Subdirectory pages: grouped by feature domain (auth, company, creator)

### Component Composition
- Pages are thin orchestration layers
- Heavy lifting done by hooks (data fetching) and components (UI)
- Pages primarily handle layout and state coordination

### SEO Handling
- Static routes: Use `<PageHelmet pageTitle="/" />` referencing `helmet-data.tsx`
- Dynamic routes: Use `<BasicHelmet>` directly with computed title/description

### MobX Integration
- Pages reading from MobX stores must be wrapped with `observer()`
- Access stores via `use*Context()` hooks

### Loading States
- Handle loading, error, and empty states explicitly
- Show appropriate UI feedback for each state

## Guidelines for Adding New Pages

1. **Route First:** Define the route in the appropriate routes file before creating the page
2. **Thin Pages:** Keep pages focused on composition; extract logic to hooks
3. **SEO:** Always include helmet component for proper metadata
4. **Auth:** Use route guards for protected pages, not in-page checks
5. **Observer:** Wrap with `observer()` if reading MobX observable state
6. **Subdirectory:** Group related pages (auth flow, creator tools) in subdirectories
