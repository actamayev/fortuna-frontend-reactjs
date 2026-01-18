# src/components Directory

This directory contains reusable React components organized by feature domain. Components handle UI rendering and delegate logic to hooks.

## Architecture Patterns

### Component Structure
- **Props Interface**: Define typed props at top of file
- **Hooks First**: Call hooks before any conditional returns
- **MobX Observer**: Wrap with `observer()` when reading from MobX stores
- **Tailwind CSS**: Use utility classes for styling with dark mode support (`dark:`)

### Component Types
1. **Feature Components**: Domain-specific UI (video player, wallet card)
2. **Layout Components**: Page structure (header, footer, layout)
3. **Shared Components**: Reusable UI primitives (buttons, modals, form inputs)
4. **Template Components**: Skeleton/loading states

## Root Components

Shared components used across features:

| Component | Purpose |
|-----------|---------|
| `layout.tsx` | Main app layout wrapper with header/footer |
| `error-message.tsx` | Styled error message display |
| `form-group.tsx` | Form field wrapper with label |
| `loading-oval.tsx` | Loading spinner |
| `modal-header.tsx` | Reusable modal header with close button |
| `notification-box.tsx` | Toast notification display |
| `tooltip.tsx` | Hover tooltip wrapper |
| `generalized-video-thumbnail.tsx` | Video card with thumbnail, duration, title |
| `video-duration-sticker.tsx` | Duration badge overlay |
| `sold-out-sticker.tsx` | Sold out badge overlay |
| `single-video-tag.tsx` | Clickable hashtag chip |
| `range-selector-slider.tsx` | Slider input component |
| `choose-site-theme.tsx` | Light/dark theme toggle |
| `share-channel-button.tsx` | Share creator channel button |
| `show-auth-to-null-user.tsx` | Auth prompt for logged-out users |
| `show-user-profile-image-or-default-image.tsx` | Profile image with fallback |
| `null-user-nav-link.tsx` | Nav link that prompts login |
| `hover-outline-component.tsx` | Adds hover outline effect |
| `hover-not-allowed-component.tsx` | Disabled state with tooltip |
| `status-message.tsx` | Status/info message display |

---

## Feature Directories

### auth/
Authentication forms and OAuth components.

- `login-form.tsx`: Email/password login form
- `register-form.tsx`: Registration form
- `google/`: Google OAuth button and callback handling

---

### buttons/
Reusable button components with consistent styling.

- Primary, secondary, danger variants
- Loading states
- Icon buttons

---

### contact/
Contact page form components.

- Contact form fields and submission

---

### create-new-video-information/
Multi-step video creation flow.

- `upload-media/`: Video and thumbnail file upload
- `exclusive-content/`: Tier pricing configuration
- `new-video-summary/`: Review before publishing

---

### creator/
Creator profile page components.

- `creator-header/`: Banner, profile pic, channel info
- `creator-videos-filter-row/`: Filter/sort controls
- `creator-videos-map/`: Video grid display

---

### footer/
Site footer component.

---

### helmet/
SEO/meta tag components.

- `basic-helmet.tsx`: Configurable helmet with title/description
- `page-helmet.tsx`: Looks up helmet data by route

---

### home-page/
Landing page components.

- `home-page-videos-map.tsx`: Video grid
- `home-page-creators-map.tsx`: Creator carousel
- `filter-home-page-videos.tsx`: Category filter (Recent/Popular)

---

### ownership/
Purchased content library.

- `my-purchased-exclusive-content/`: Owned video cards
- `ownership-filter/`: Filter/sort controls

---

### profile/
User profile components.

---

### recent-uploads/
Recent uploads page components.

- Video grid with loading states

---

### search/
Search results display.

- Mixed video/creator result cards

---

### search-bars/
Search input components.

- `home-screen-search-bar.tsx`: Main search bar
- Header search bar

---

### site-header/
Main navigation header.

- Logo, nav links, auth buttons
- `profile-dropdown/`: User menu when logged in

---

### sliders/
Carousel/slider components.

---

### social-links/
Social platform link display and editing.

---

### studio/
Creator studio dashboard.

- `studio-header/`: Channel editing (name, description, banner, profile pic, social links)
- `my-content/`: Published video management
  - `edit-video-details-modal/`: Edit title, description, tags
  - `my-content-header/`: Content list header
  - `thumbnail/`: Thumbnail display and upload

---

### templates/
Skeleton/placeholder components for loading states.

---

### usd-or-sol/
Currency display components.

- Price display with SOL/USD toggle
- Currency conversion display

---

### video/
Video viewing page components.

- `video-player.tsx`: HTML5 video player
- `loading-video-player.tsx`: Player skeleton
- `purchase-exclusive-access-card.tsx`: Buy access CTA
- `sub-video-section/`: Description, likes, creator info
- `more-videos-area/`: Related videos from creator
- `video-tiers/`: Tier selection and progress
  - `tier-progress-bar/`: Visual tier fill indicator
  - `tiers-templates/`: Tier card layouts
- `instant-access-exclusive-content/`: Purchase flow
  - `initial/`: Tier selection step
  - `review/`: Confirmation step

---

### wallet/
Wallet page components.

- `wallet-summary-card/`: Balance display
- `send-funds/`: Send SOL flow (initial → review)
- `transfer-funds/`: Transfer flow (initial → review)
- `transactions/`: Transaction history
  - `transactions-header/`: Filter controls
  - `transaction-summary-card/`: Transaction display
    - `header/`: Transaction card header
    - `solana-transaction/`: Deposit/withdrawal details
    - `exclusive-video-content-access/`: Purchase details

---

## Guidelines for Adding New Components

1. **Colocation**: Place component near where it's used; promote to shared only when reused
2. **Single Responsibility**: One component per file, focused purpose
3. **Props Typing**: Define `interface Props` at top of file
4. **Hooks for Logic**: Extract logic to hooks in `src/hooks/`
5. **Observer Wrapping**: Use `observer()` when reading MobX store values
6. **Dark Mode**: Always include `dark:` variants for colors
7. **Naming**: Use kebab-case for files, PascalCase for component names
8. **Subdirectories**: Group related components (e.g., `initial/` and `review/` for multi-step flows)
