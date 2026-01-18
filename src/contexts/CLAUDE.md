# src/contexts Directory

This directory contains React Context providers for global state management using MobX. Each context wraps a class-based store and exposes a custom hook for accessing it.

## Architecture Pattern

Each context file follows this pattern:
1. **Class**: MobX observable store with computed values and actions
2. **Context**: React Context created with a default instance
3. **Provider Component**: Wraps component tree and provides memoized class instance
4. **Hook**: Custom `use*Context()` hook for consuming the context

All classes use `makeAutoObservable` from MobX to automatically track state and methods as observables/actions.

## Files

### auth-context.tsx

Manages user authentication state (access token and login status).

**State:**
- `_accessToken`: JWT token from login/register
- `isLoggedIn`: Computed boolean based on token presence

**Key Methods:**
- `getAuthDataFromStorage()`: Loads stored token from localStorage
- `setAccessToken(token, saveToStorage)`: Updates token and optionally persists it
- `logout()`: Clears token from memory and storage

**Usage:** `const auth = useAuthContext()`

---

### creator-context.tsx

Manages creator studio state (content, profile, video creation form).

**State:**
- `myContent[]`: List of creator's published videos
- `myContentFilter`: Sort/filter/visibility options for content library
- `newVideoDetails`: Form state for creating new video (files, metadata, tiers)
- `channelName/Description`: Creator profile info
- `profilePictureUrl/channelBannerUrl`: Creator media URLs
- `socialPlatformLinks[]`: Creator's social media links

**Key Methods:**
- Content Management: `setContent()`, `addContent()`, `updateVideoProperty()`, `contextForMyContent()`
- Filtering: `updateMyContentFilter()`, `updateVisibilityFilter()`
- Video Tiers: `addVideoTier()`, `deleteTier()`, `updateNewVideoTierDetails()`
- Tags: `addTagToVideo()`, `removeTagFromVideo()`
- Profit Calculation: `totalMaxProfit`, `newVideoFortunaFee`, `profitAfterFee`
- Profile: `setChannelName()`, `addSocialPlatformLink()`
- Featured: `featureVideoAndUnfeatureVideo()`, `unfeatureVideo()`

**Usage:** `const creator = useCreatorContext()`

---

### fortuna-api-client-context.tsx

Singleton HTTP client aggregator providing access to all backend API service classes.

**State:**
- `httpClient`: FortunaHttpClient instance for making requests
- Multiple data services: `authDataService`, `creatorDataService`, `videoDataService`, etc.

**Services Included:**
- AuthDataService
- CreatorDataService
- MarketDataService
- PersonalInfoDataService
- PositionsAndTransactionsDataService
- SearchDataService
- SolanaDataService
- UploadDataService
- VideoDataService

**Key Methods:**
- `logout()`: Clears token and reinitializes all services

**Usage:** `const { authDataService, videoDataService } = useApiClientContext()`

**Note:** This is different from other contexts - it's not MobX-based, but it's accessed via context for dependency injection.

---

### market-context.tsx

Manages marketplace transaction state (instant access to exclusive content).

**State:**
- `instantAccessToExclusiveContentStage`: Current step in purchase flow ("initial" or "review")

**Key Methods:**
- `setInstantAccessToExclusiveContentStage()`: Update transaction stage
- `resetInstantAccessToExclusiveContentStage()`: Reset to initial state

**Usage:** `const market = useMarketContext()`

---

### notifications-context.tsx

Manages temporary notification/toast messages with auto-dismiss.

**State:**
- `notification`: Current message text (or null)
- `notificationBoxClasses`: Tailwind classes for styling based on type
- `timer`: Timeout handle for auto-clearing

**Key Methods:**
- `setSuperPositiveNotification()`: Success message (green)
- `setPositiveNotification()`: Info message (blue)
- `setNeutralNotification()`: Neutral message (white/dark)
- `setNegativeNotification()`: Error message (red)

**Behavior:** Messages auto-dismiss after 3 seconds via internal timer management.

**Usage:** `const notifications = useNotificationsContext()`

---

### personal-info-context.tsx

Manages user profile information and preferences (theme, currency).

**State:**
- `username`: User's username
- `email`: User's email address
- `defaultCurrency`: Preferred display currency ("sol" or "usd")
- `defaultSiteTheme`: Preferred site theme ("light" or "dark")
- `isRetrievingPersonalInfo`: Loading state

**Key Methods:**
- `setRetrievedPersonalData()`: Load user data from API response
- `setDefaultCurrency()`: Change preferred currency and update localStorage
- `setDefaultSiteTheme()`: Change theme, update localStorage, and add/remove "dark" class on document root
- `logout()`: Clear user-specific data (theme/currency persist)

**Initialization:** Loads currency and theme from localStorage on construction.

**Usage:** `const personalInfo = usePersonalInfoContext()`

---

### positions-and-transactions-context.tsx

Manages wallet transactions and purchased content ownership history.

**State:**
- `mySolanaTransactions[]`: History of deposits, withdrawals, and purchases
- `myPurchasedExclusiveContent[]`: Videos the user has purchased access to
- Filters: `walletFilter`, `ownershipFilter`
- Time range: `transactionsTimeRange` ("Month", "Week", "Today")
- Focus: `transactionIdToFocusOn`: Currently selected transaction
- Loading: `isRetrievingTransactions`, `isRetrievingPurchasedExclusiveContent`

**Key Methods:**
- Transaction Management: `setTransactions()`, `addSolanaTransaction()`, `contextForMyTransaction()`
- Content Management: `setExclusiveContent()`, `addExclusiveContent()`
- Filtering: `updateWalletFilter()`, `updateTransactionTypeFilter()`, `updateOwnershipFilter()`
- Calculations: `calculateDepositsUsd()`, `calculateDepositsSol()`, `calculateWithdrawalsUsd()`, `calculateWithdrawalsSol()`
- Time Range: `handleTimeRangeClick()` cycles through Month → Week → Today
- Focus: `updateTransactionToFocusOn()` toggles transaction selection

**Usage:** `const positions = usePositionsAndTransactionsContext()`

---

### solana-context.tsx

Manages Solana blockchain interactions (wallet, balance, transfers).

**State:**
- `walletPublicKey`: Connected wallet's public key
- `walletBalanceSol`: SOL balance
- `walletBalanceUSD`: Computed USD value of SOL balance
- `solPriceDetails`: Current SOL/USD exchange rate
- `moneyTransferDetails`: State during money transfer flow (recipient, amount, stage)
- `isPublicKeySearchLoading`: Loading state for username → public key lookup
- `isRetrievingWalletDetails`: Loading state for wallet balance
- `isMoneyTransferButtonPressed`: UI state for transfer form

**Key Methods:**
- Wallet: `setWalletPublicKey()`, `setWalletBalanceSol()`, `alterWalletBalanceSol()`, `alterWalletBalanceUsd()`
- Pricing: `setSolPriceDetails()`
- Transfer: `updateMoneyTransferDetails()`, `resetMoneyTransferDetails()`
- UI: `setIsMoneyTransferButtonPressed()`, `setIsPublicKeySearchLoading()`

**Note:** SOL price persists during logout (not secret/user-specific).

**Usage:** `const solana = useSolanaContext()`

---

### video-context.tsx

Manages video data and browsing state (videos, search, hashtags, creators).

**State:**
- `videos[]`: Master list of all loaded video data
- Home: `homeScreenCreators[]`, `recentlyPostedHomeScreenVideos[]`, `mostPopularHomeScreenVideos[]`, `homeScreenVideosToShowCategory`
- Search: `searchTerm`, `videoSearchMap` (maps search term → results), `isCurrentlySearching`
- Hashtags: `videoHashtagMap` (maps hashtag → videos), `isCurrentlySearchingHashtag`
- Creators: `creatorData[]` (creator profile + their videos), `isCreatorDataBeingRetrieved`
- Filters: `creatorVideosFilter` (for filtering creator's videos)
- UI: `videosBeingRetrieved[]`, `isRetrievingVideoUrl`

**Key Methods:**
- Video Lookup: `findVideoFromUUID()`, `contextForVideo()`, `findVideoInSearchMapByUUID()`
- Video Management: `addVideoToVideosList()`, `addVideoUrlToVideo()`, `setVideoUrlRetrievalAttempted()`
- Home: `setRecentlyPostedHomePageVideos()`, `setMostPopularHomePageVideos()`
- Search: `setVideoSearchMapData()`, `setSearchTerm()`
- Hashtags: `setHashtagMapData()`
- Creators: `addRetrievedCreatorData()`, `contextForCreatorData()`, `contextForCreatorDataNotIncluding()`
- Updates: `updateVideoDetailsAfterUserPurchase()`, `updateVideoDetailsAfterLikeOrRemoveLike()`
- Lifecycle: `clearVideosOnLogin()`, `logout()`

**Data Structures:**
- Uses Map for search results and hashtag data (key-value lookup)
- Stores creator data with associated video lists
- Tracks video URL retrieval status separately from actual URL

**Usage:** `const video = useVideoContext()`

---

## Guidelines for Adding New Contexts

1. **When to Create:** Create a context for feature domain state that needs to be accessed across many components
2. **Class-Based:** Always use a class with MobX `makeAutoObservable()`
3. **Naming:** Follow `*Context` for the context and `use*Context` for the hook
4. **Organization:** Group related state and methods in the same class
5. **Lifecycle:** Implement `logout()` method to reset state on user logout
6. **Performance:** Memoize class instance in provider to prevent unnecessary re-renders
7. **Computed Values:** Use MobX `@computed` or `computed()` for derived state
8. **Actions:** Wrap mutations with `@action` or `action()` for MobX tracking
