# src/utils Directory

This directory contains utility functions and helpers organized by domain. Utilities are stateless, reusable functions that don't depend on React context or application state.

## Root Files

### capitalize-first-letter.ts
Simple string utility to capitalize the first letter of a string.

- `capitalizeFirstLetter(string)`: Returns string with first character uppercased

---

### clean-video-tag.ts
Sanitizes video tag input for consistency.

- `cleanVideoTag(tag)`: Trims whitespace, removes leading `#`, converts to lowercase

---

### convert-social-link-to-proper-casing.ts
Normalizes social platform names for display.

- `convertSocialLinkToProperCasing(platform)`: Maps lowercase platform keys to display names (e.g., "youtube" → "YouTube", "tiktok" → "TikTok")

---

### handle-number-input.ts
Validates and constrains numeric input from form fields.

- `handleMinNumberInput(event, minNumber)`: Parses input, returns value or min if invalid/below threshold
- `handleBoundedNumberInput(event, minNumber, maxNumber)`: Same as above but clamps to max, rounds to 2 decimal places

---

### helmet-data.tsx
SEO metadata configuration using React Helmet for each route.

- `helmetData`: Object mapping route paths to `<BasicHelmet>` components with title, description, and canonical URL
- Routes covered: `/`, `/recent-uploads`, `/login`, `/register`, `/register-username`, `/ownership`, `/wallet`, `/creator/studio`, `/creator/create-content`, `/contact`

---

### leading-at-operations.ts
Utilities for handling `@`-prefixed usernames (branded type `AtPrefixedString`).

- `addLeadingAt(username)`: Adds `@` prefix if not present, returns branded type
- `removeLeadingAt(username)`: Strips `@` prefix if present

---

### platform-icons.ts
Maps social platform names to Font Awesome icon classes.

- `getPlatformIcon(platform)`: Returns FA icon class for platform (e.g., "youtube" → "fa-youtube", "twitter" → "fa-x-twitter")
- Supported: youtube, twitter/x, instagram, tiktok, twitch, discord, facebook

---

### type-checks.ts
TypeScript type guard functions for runtime type narrowing.

**Response Type Guards:**
- `isErrorResponse(data)`: Checks for `{ error: string }`
- `isValidationErrorResponse(data)`: Checks for `{ validationError: string }`
- `isMessageResponse(data)`: Checks for `{ message: string }`
- `isNonSuccessResponse(data)`: Union of above three
- `isErrorResponses(data)`: Error or validation error only

**Domain Type Guards:**
- `isValidCurrency(value)`: Checks if value is "sol" or "usd"
- `isValidSiteTheme(value)`: Checks if value is "light" or "dark"
- `isVideoData(data)`: Distinguishes `VideoDataWithUrlRetrievalStatus` from `CreatorData` in `SearchData` union
- `isSolanaTransaction(data)`: Distinguishes `SolanaTransaction` from `MyPurchasedExclusiveContent` in `SingleTransaction` union
- `isNumber(value)`: Basic number type check

---

## Subdirectories

### auth/

Form validation utilities for authentication flows.

**confirm-login-fields.ts**
- `confirmLoginFields(credentials)`: Validates login form (contact and password present), returns error message or null

**confirm-register-fields.ts**
- `confirmRegisterFields(credentials)`: Validates registration form (email format, password match, minimum length), returns error message or null

**is-email-valid.ts**
- `isEmailValid(email)`: Basic email format validation using regex

---

### error-handling/

Standardized error response handling.

**set-error-axios-response.ts**
- `setErrorAxiosResponse(error, setError)`: Extracts error message from Axios error responses (handles network errors, validation errors, generic errors) and calls the provided setter function

---

### video-access-tiers/

Utilities for exclusive content tier pricing and access.

**get-current-exclusive-access-tier.ts**
- `getCurrentExclusiveAccessTier(tierData, solPrice)`: Finds the cheapest non-sold-out tier and returns its data with USD price calculation

**get-tier-by-tier-number.ts**
- `getTierByTierNumber(tierNumber, tierData)`: Finds tier object by its number

**get-tiered-access-price-usd.ts**
- `getTieredAccessPriceUsd(tierData, solPrice)`: Calculates USD price for a tier using current SOL exchange rate, handles null/undefined safely

---

## Organization Patterns

### File Naming
- Descriptive kebab-case names matching the function's purpose
- Single-function files for focused utilities
- Subdirectories for related function groups

### Function Design
- Pure functions with no side effects
- Explicit return types
- Defensive handling of edge cases (NaN, null, undefined)
- Type guards return `data is Type` for TypeScript narrowing

### Subdirectory Grouping
- Group related utilities by feature domain (auth, error-handling, video-access-tiers)
- Keep root-level files for general-purpose utilities

## Guidelines for Adding New Utilities

1. **Stateless:** Utilities should not depend on React context or global state
2. **Pure:** Functions should have no side effects, return values based only on inputs
3. **Focused:** One function per file for simple utilities; group related functions in subdirectories
4. **Typed:** Always provide explicit parameter and return types
5. **Defensive:** Handle edge cases (null, undefined, NaN, empty strings)
6. **Naming:** Use descriptive kebab-case filenames that match the function name
