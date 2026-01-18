# src/hooks Directory

This directory contains custom React hooks organized by feature domain. Hooks encapsulate reusable logic including data fetching, event handlers, side effects, and computed values.

## Architecture Patterns

### Hook Types

1. **UseEffect Hooks** (`*-use-effect.ts`): Side effects that run on mount or dependency changes
   - Fetch data from API
   - Set up event listeners
   - Typically return `void`

2. **Callback Hooks**: Return memoized handler functions for user interactions
   - Form submissions
   - Button clicks
   - Return `useCallback` wrapped functions

3. **Computed Hooks** (`*-to-show.ts`): Derived/filtered data from context
   - Apply filters to lists
   - Return `useMemo` wrapped values

4. **Utility Hooks**: Reusable logic patterns
   - Navigation wrappers
   - Number formatting
   - Validation

### Common Pattern

```typescript
export default function useExampleHook(param: Type): ReturnType {
  const context = useSomeContext()
  const apiClient = useApiClientContext()

  return useCallback(async () => {
    // logic here
  }, [dependencies])
}
```

## Directory Structure

### Root Hooks

**date-formatter.ts**
- `useDateFormatter()`: Formats dates using dayjs with locale support

**scroll-to-top.ts**
- `useScrollToTop()`: Scrolls window to top on route changes

**handle-click-external-social-url.ts**
- `useHandleClickExternalSocialUrl()`: Opens social platform URLs in new tab

---

### analytics/

**initialize-tag-manager.ts**
- `useInitializeTagManager()`: Sets up Google Tag Manager on app load

---

### auth/

Authentication flow hooks.

**login-submit.ts**
- `useLoginSubmit(whereTo, credentials, setError, setLoading)`: Form submission handler for login

**register-submit.ts**
- `useRegisterSubmit(...)`: Form submission handler for registration

**logout.ts**
- `useLogout()`: Clears auth state and redirects

**handle-logout.ts**
- `useHandleLogout()`: Logout with confirmation/cleanup

**get-auth-data-from-storage.ts**
- `useGetAuthDataFromStorage()`: Loads token from localStorage on mount

**set-data-after-login-or-register.ts**
- `useSetDataAfterLoginOrRegister()`: Updates contexts after successful auth

**google/** (subdirectory)
- `useGoogleAuthCallback()`: Handles OAuth callback from Google
- `useUsernameSubmit()`: Sets username after OAuth registration

---

### click-outside/

**click-outside-modal-use-effect.ts**
- `useClickOutsideModalUseEffect(ref, onClose)`: Closes modal when clicking outside

---

### creator/

Creator studio functionality.

**retrieve-my-content-use-effect.ts**
- `useRetrieveMyContentUseEffect()`: Fetches creator's published videos

**retrieve-creator-info-use-effect.ts**
- `useRetrieveCreatorInfoUseEffect()`: Fetches creator profile data

**my-content-to-show.ts**
- `useMyContentToShow()`: Filters/sorts creator's content list

**update-video-listing-status.ts**
- `useUpdateVideoListingStatus()`: Toggle LISTED/UNLISTED

**add-or-edit-channel-description.ts**
- `useAddOrEditChannelDescription()`: Update channel description

**remove-current-profile-picture.ts** / **remove-current-channel-banner-picture.ts**
- Remove creator images

**channel-name/** (subdirectory)
- `useEditChannelName()`: Update channel name
- `useAssignDefaultChannelName()`: Set initial channel name

**create-video/** (subdirectory)
- `useCreateVideoOnClick()`: Submit new video
- `useConfirmNewVideoDetails()`: Validate video form
- `useIsNewVideoLoading()`: Track upload progress

**feature-unfeature-video/** (subdirectory)
- `useFeatureVideo()`: Mark video as featured
- `useUnfeatureVideo()`: Remove featured status

**social-links/** (subdirectory)
- `useAddOrEditSocialLink()`: Add/update social platform link
- `useRemoveSocialLink()`: Delete social link

**video-description/** (subdirectory)
- `useEditVideoDescription()`: Update video description
- `useAssignDefaultVideoDescription()`: Set initial description

**video-name/** (subdirectory)
- `useEditVideoName()`: Update video title
- `useAssignDefaultVideoName()`: Set initial title

**video-tag/** (subdirectory)
- `useAddVideoTag()`: Add tag to video
- `useRemoveVideoTag()`: Remove tag from video

---

### handle-type-validation/

Input validation with API lookup.

**handle-public-key-validation.ts**
- `useHandlePublicKeyValidation()`: Validates Solana public key format and checks if registered

**handle-type-username.ts**
- `useHandleTypeUsername()`: Validates username input and checks availability

---

### listeners/

Global event listeners.

**logout-listener-use-effect.ts**
- `useLogoutListenerUseEffect()`: Listens for logout events across tabs

**escape-key-listener-use-effect.ts**
- `useEscapeKeyListenerUseEffect(onEscape)`: Closes modals on Escape key

**default-currency-listener-use-effect.ts**
- `useDefaultCurrencyListenerUseEffect()`: Syncs currency preference across tabs

**site-theme-listener-use-effect.ts**
- `useSiteThemeListenerUseEffect()`: Syncs theme preference across tabs

---

### market/

Marketplace transaction hooks.

**purchase-exclusive-content-access.ts**
- `usePurchaseExclusiveContentAccess()`: Execute tier purchase

**click-tiers-button.ts**
- `useClickTiersButton()`: Handle tier selection UI

**reset-instant-access-stage-on-location-change-use-effect.ts**
- Resets purchase flow stage when navigating away

---

### memos/

Memoized preference values.

**default-currency.ts**
- `useDefaultCurrency()`: Returns current currency preference

**default-site-theme.ts**
- `useDefaultSiteTheme()`: Returns current theme preference

---

### navigate/

Type-safe navigation wrappers.

**typed-navigate.ts**
- `useTypedNavigate()`: Type-safe wrapper around react-router navigate

**navigate-to-video-page.ts**
- `useNavigateToVideoPage()`: Navigate to `/v/:uuid`

**navigate-to-video-new-page.ts**
- `useNavigateToVideoNewPage()`: Navigate to video in new tab

**navigate-to-creator-page.ts**
- `useNavigateToCreatorPage()`: Navigate to `/c/:username`

**navigate-to-hashtag-page.ts**
- `useNavigateToHashtagPage()`: Navigate to `/tag/:hashtag`

---

### numbers/

Number formatting utilities.

**numbers-with-commas.ts**
- `useNumbersWithCommas()`: Format numbers with thousand separators

**format-number-to-whole-number.ts**
- `useFormatNumberToWholeNumber()`: Round and format to integer

---

### personal-info/

User preferences.

**retrieve-personal-info-use-effect.ts**
- `useRetrievePersonalInfoUseEffect()`: Fetch user settings on mount

**set-default-currency.ts**
- `useSetDefaultCurrency()`: Update preferred currency

**set-default-site-theme.ts**
- `useSetDefaultSiteTheme()`: Update preferred theme

---

### positions-and-transactions/

Wallet and ownership data.

**retrieve-transactions.ts**
- `useRetrieveTransactions()`: Fetch transaction history

**retrieve-my-purchased-exclusive-content.ts** / **retrieve-my-purchased-exclusive-content-use-effect.ts**
- Fetch user's purchased content

**transactions-to-show.ts**
- `useTransactionsToShow()`: Filter/sort transactions

**my-ownership-to-show.ts**
- `useMyOwnershipToShow()`: Filter/sort owned content

**check-if-uuid-exists-in-exclusive-content-list.tsx**
- Check if user owns specific video

---

### redirects/

Route guard logic.

**redirect-known-user.ts**
- `useRedirectKnownUser()`: Redirect logged-in users away from auth pages

**redirect-user-with-username.ts**
- `useRedirectUserWithUsername()`: Redirect users who already have username

**redirect-back-to-register-username.ts**
- `useRedirectBackToRegisterUsername()`: Redirect OAuth users without username

---

### search/

Search functionality.

**search-for-videos-and-creators.ts**
- `useSearchForVideosAndCreators()`: General search hook

**retrieve-videos-by-hashtag.ts**
- `useRetrieveVideosByHashtag()`: Fetch videos by tag

---

### solana/

Blockchain interactions.

**retrieve-sol-price-use-effect.ts**
- `useRetrieveSolPriceUseEffect()`: Fetch current SOL/USD rate

**money-transfer/** (subdirectory)
- `useMoneyTransfer()`: Execute SOL transfer
- `useConfirmSufficientMoneyToTransfer()`: Validate balance before transfer
- `useUpdateTransferFundsDetailsNewDefaultCurrency()`: Convert amounts on currency change

---

### upload/

File upload handlers.

**upload-profile-picture.ts**
- `useUploadProfilePicture()`: Upload creator profile image

**upload-channel-banner-picture.ts**
- `useUploadChannelBannerPicture()`: Upload creator banner

**upload-new-thumbnail-picture.ts**
- `useUploadNewThumbnailPicture()`: Replace video thumbnail

---

### videos/

Video data and interactions.

**retrieve-home-page-data-use-effect.ts**
- `useRetrieveHomePageVideos()`: Fetch home page content

**retrieve-recent-uploads-use-effect.ts**
- `useRetrieveRecentUploadsUseEffect()`: Fetch recent videos

**retrieve-creator-videos-and-data-use-effect.ts**
- `useRetrieveCreatorVideosAndDataUseEffect()`: Fetch creator's videos

**retrieve-video-url-data-use-effect.ts**
- `useRetrieveVideoUrlDataUseEffect()`: Fetch streaming URL for video

**set-single-video-use-effect.ts**
- `useSetSingleVideoUseEffect()`: Load single video data

**creator-videos-to-show.ts**
- `useCreatorVideosToShow()`: Filter creator's video list

**like-video.ts**
- `useLikeVideo()`: Toggle video like status

**report-video.ts**
- `useReportVideo()`: Submit video report

---

## Guidelines for Adding New Hooks

1. **Naming:** Use `use` prefix, descriptive name, and suffix indicating type (`-use-effect`, `-to-show`)
2. **Organization:** Place in appropriate subdirectory by feature domain
3. **Dependencies:** Always include complete dependency arrays for `useCallback`/`useEffect`/`useMemo`
4. **Error Handling:** Use try/catch with `setErrorAxiosResponse` for API calls
5. **Loading States:** Accept `setLoading` callback for async operations
6. **Context Access:** Use context hooks at top of function, not inside callbacks
7. **Type Safety:** Explicitly type parameters and return values
8. **Single Responsibility:** One hook per file, focused on specific functionality
