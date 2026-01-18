# src/services Directory

This directory contains data service classes that handle all HTTP communication with the backend API. Each service is responsible for a specific feature domain and is used via the [FortunaApiClientContext](../contexts/fortuna-api-client-context.tsx).

## Architecture Pattern

All data services follow the same pattern:
1. **Path Header**: Define the API endpoint prefix (e.g., `/auth`, `/creator`)
2. **Constructor Dependency**: Inject `FortunaHttpClient` instance
3. **Methods**: Async methods that wrap HTTP requests with proper typing
4. **Response Types**: Use typed response generics for compile-time safety
5. **Headers**: Can override headers (e.g., "No-Auth-Required" for public endpoints)

## Files

### auth-data-service.ts

Handles user authentication (login, registration, Google OAuth).

**Endpoints:**
- `login(credentials)`: POST `/auth/login` - Traditional login
- `register(credentials)`: POST `/auth/register` - Create account with email/password
- `registerUsername(username)`: POST `/auth/set-username` - Set username after registration
- `logout()`: POST `/auth/logout` - Logout and invalidate token
- `googleLoginCallback(idToken, theme)`: POST `/auth/google-auth/login-callback` - Google OAuth callback

**Response Types:**
- Login/Register: `LoginOrRegisterSuccess | NonSuccessResponse`
- Google Auth: `GoogleAuthSuccess | ErrorResponses` (includes `isNewUser` flag)

**Auth:** Most endpoints use "No-Auth-Required" header (public auth endpoints)

---

### creator-data-service.ts

Manages creator content, profile information, and metadata editing.

**Content Methods:**
- `getMyContent()`: GET `/creator/get-creator-content-list` - Retrieve creator's videos
- `createVideo(videoData)`: POST `/creator/create-video` - Publish new video
- `editVideoName(name, videoId)`: POST `/creator/edit-video-name`
- `editVideoDescription(description, videoId)`: POST `/creator/edit-video-description`
- `updateVideoListingStatus(videoId)`: POST `/creator/update-video-listing-status/{videoId}` - Toggle LISTED/UNLISTED

**Featured Video Methods:**
- `featureVideo(toFeature, toUnfeature?)`: POST `/creator/feature-video` - Set featured video
- `unfeatureVideo(toUnfeature)`: POST `/creator/unfeature-video` - Remove featured status

**Tag Methods:**
- `addVideoTag(tag, videoId)`: POST `/creator/add-video-tag` - Add tag to video
- `deleteVideoTag(tagId, videoId)`: POST `/creator/delete-video-tag` - Remove tag from video

**Profile Methods:**
- `getCreatorInfo()`: GET `/creator/get-creator-info` - Retrieve creator profile
- `editChannelName(name)`: POST `/creator/edit-channel-name`
- `addOrEditChannelDescription(description)`: POST `/creator/add-or-edit-channel-description`
- `addOrEditSocialPlatformLink(link, platform)`: POST `/creator/add-or-edit-social-platform-link`
- `removeSocialPlatformLink(platform)`: POST `/creator/remove-social-platform-link/{platform}`
- `removeCurrentProfilePicture()`: POST `/creator/remove-current-profile-picture`
- `removeCurrentChannelBannerPicture()`: POST `/creator/remove-current-channel-banner-picture`

**Response Types:**
- `CreateVideoResponse`: Returns new video ID and tags
- `CreatorInfoResponse`: Channel name, description, images, social links

---

### market-data-service.ts

Handles video marketplace transactions (purchasing exclusive content).

**Endpoints:**
- `purchaseExclusiveContentAccess(videoId, tierNumber)`: POST `/market/purchase-instant-exclusive-content-access` - Buy access to tier

**Response:** `PurchaseInstantAccessResponse | NonSuccessResponse` (includes video URL, new balance, transaction signature)

---

### personal-info-data-service.ts

Manages user profile preferences (currency, theme).

**Endpoints:**
- `retrievePersonalInfo()`: GET `/personal-info/get-personal-info` - Get user's settings
- `setDefaultCurrency(currency)`: POST `/personal-info/set-default-currency/{currency}` - Change preferred currency
- `setDefaultSiteTheme(theme)`: POST `/personal-info/set-default-site-theme/{theme}` - Change theme preference

**Response Types:**
- `PersonalInfoResponse`: Username, email, currency, theme
- Settings: `SuccessResponse | ErrorResponses`

---

### positions-and-transactions-data-service.ts

Retrieves user's transaction history and purchased content.

**Endpoints:**
- `getSolanaTransactions()`: GET `/positions-and-transactions/get-solana-transactions` - Get all transactions
- `getMyPurchasedExclusiveContent()`: GET `/positions-and-transactions/get-my-purchased-exclusive-content` - Get owned content

**Response Types:**
- `TransactionsResponse`: Array of `SolanaTransaction`
- `MyOwnershipResponse`: Array of `MyPurchasedExclusiveContent`

---

### search-data-service.ts

Handles all search functionality (users, videos, hashtags, general search).

**Endpoints:**
- `searchForUsername(username)`: GET `/search/username/{username}` - Find users by username
- `checkIfPublicKeyRegisteredOnFortuna(publicKey)`: GET `/search/check-if-public-key-exists-with-fortuna/{publicKey}` - Verify Solana address
- `generalSearch(term)`: GET `/search/general-search/{term}` - Search videos and creators (public, no auth required)
- `getVideosByTag(tag)`: GET `/search/get-videos-by-tag/{tag}` - Get videos with specific tag

**Response Types:**
- `SearchForUsersResponse`: Array of usernames
- `BooleanResponse`: `{ exists: boolean }`
- `GeneralSearchResponse`: Array of `SearchData` (video or creator)
- `VideoTagResponse`: Array of videos with that tag

**Auth:** `generalSearch` uses "No-Auth-Required" header (public search)

---

### solana-data-service.ts

Manages Solana blockchain operations (transfers, SOL pricing).

**Transfer Methods:**
- `moneyTransferToUsername(data)`: POST `/solana/money-transfer-to-username` - Send SOL to username
- `moneyTransferToPublicKey(data)`: POST `/solana/money-transfer-to-public-key` - Send SOL to public key

**Price Method:**
- `getSolPrice()`: GET `/solana/get-sol-price` - Get current SOL/USD rate (public, no auth required)

**Response Types:**
- `TransferFundsResponse`: Transaction details, new balance, signature
- `SolPriceResponse`: Current price and retrieval timestamp

---

### upload-data-service.ts

Handles file uploads (videos, images) using FormData.

**Video Methods:**
- `uploadVideo(file)`: POST `/upload/upload-video` - Upload video file
- `uploadThumbnailPicture(file, uuid)`: POST `/upload/upload-thumbnail-picture` - Upload initial thumbnail
- `uploadNewThumbnailPicture(file, videoId)`: POST `/upload/upload-new-thumbnail-picture` - Replace video thumbnail

**Image Methods:**
- `uploadProfilePicture(file)`: POST `/upload/upload-profile-picture` - Creator profile image
- `uploadChannelBannerPicture(file)`: POST `/upload/upload-channel-banner-picture` - Creator banner image

**Implementation Notes:**
- Uses `FormData` to send binary files
- Sets `Content-Type` header to file's MIME type
- Each method appends file with original filename

**Response Types:**
- `UploadVideoResponse`: Video ID, UUID, duration
- `UploadThumbnailResponse`: URL and uploaded image ID
- `UploadNewThumbnailResponse`: Just the URL
- Image uploads: `ProfilePictureUrl | ChannelBannerPictureUrl`

---

### video-data-service.ts

Retrieves video data (browse, details, interactions).

**Browse Methods:**
- `getHomePageData()`: GET `/videos/get-home-page-data` - Recent + popular videos + creators (public)
- `getRecentlyUploadedVideos()`: GET `/videos/get-recently-uploaded-videos` - New videos (public)

**Video Detail Methods:**
- `getVideoById(uuid)`: GET `/videos/get-video/{uuid}` - Single video details (public)
- `getVideosByCreatorUsername(username)`: GET `/videos/get-creator-videos/{username}` - Creator's video list (public)
- `getVideoUrl(uuid)`: GET `/videos/get-video-url/{uuid}` - Get streaming URL (public)

**Interaction Methods:**
- `likeOrUnlikeVideo(videoId, status)`: POST `/videos/like-or-unlike-video` - Toggle like
- `reportVideo(videoId, message?)`: POST `/videos/report-video` - Report inappropriate content

**Response Types:**
- `HomePageData`: Recently posted videos, most popular, creator list
- `CreatorDataResponse`: Creator profile + their videos
- `RetrievedVideo`: Single video with URL retrieval status
- `RetrievedVideoUrl`: Just the streaming URL

**Auth:** All GET endpoints use "No-Auth-Required" header (public browsing)

---

## Guidelines for Adding New Services

1. **When to Create:** Create a service for each API endpoint prefix/feature domain
2. **Naming Convention:** `*DataService` for class names, `pathHeader` as the API prefix
3. **Constructor:** Always accept `FortunaHttpClient` via dependency injection
4. **Methods:** One async method per API endpoint
5. **Typing:** Always specify both success and possible error response types
6. **Headers:** Use "No-Auth-Required" header for public endpoints that don't require auth
7. **FormData:** Use `form-data` package for file uploads, set appropriate Content-Type
8. **Consistency:** Match the naming and pattern of existing services

## Pattern Example

```typescript
export default class ExampleDataService {
	private readonly pathHeader: PathHeaders = "/example"

	constructor(private readonly httpClient: FortunaHttpClient) {}

	async exampleMethod(param: string): Promise<AxiosResponse<SuccessType | ErrorType>> {
		return await this.httpClient.http.post<SuccessType | ErrorType>(
			`${this.pathHeader}/endpoint`, { param }
		)
	}
}
```
