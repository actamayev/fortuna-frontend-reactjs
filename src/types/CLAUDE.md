# src/types Directory

This directory contains global TypeScript type definitions for the Fortuna application, organized by domain.

## File Organization

### auth.d.ts
Handles authentication-related types for login and registration flows.

- `LoginCredentials`: Form data for login (contact, password)
- `RegisterCredentials`: Form data for registration with password confirmation
- `RegisterCredentialsToSend`: Validated registration payload with site theme
- `LoginOrRegister`: Discriminator type for auth flow state

### creator.d.ts
Manages content creation and creator-related types for video publishing and creator info.

- `CommonNewVideoDetails`: Base video metadata (name, description, exclusivity, tiers, tags)
- `NewVideoDetails`: Form state with file inputs before upload
- `CreateVideo`: Final payload sent to backend with uploaded asset IDs
- `MyContent`: Complete video record with metrics (likes, earnings, creation date)
- `TierData` / `TierDataToSend`: Paid access tier configuration
- `VideoTag`: Tag with ID from database
- `SocialPlatformLinks`: Creator's social media links
- `MyContentFilter`: Sorting and filtering for creator's content library

### positions-and-transactions.d.ts
Defines transaction and purchase history types for wallet and ownership features.

- `SolanaTransaction`: Complete transaction record (deposits/withdrawals, amounts, signatures)
- `MyPurchasedExclusiveContent`: Purchased video metadata with transaction details
- `WalletFilter`: Filtering transactions by type, date range, and text search
- `OwnershipFilter`: Sorting purchased content by date or amount
- `TransactionTypes`: Deposit, Withdrawal, or Content Purchase
- `WalletFilterRange`: Time-based filters (Today, Week, Month)
- `SingleTransaction`: Union type for transaction variants
- `OwnershipSortBy`: Sort options for purchased content

### response-types.d.ts
API response type definitions organized by endpoint category (auth, creator, market, etc.).

- Common responses: `SuccessResponse`, `MessageResponse`, `ErrorResponse`, `ValidationErrorResponse`
- Auth responses: `LoginOrRegisterSuccess`, `GoogleAuthSuccess`
- Creator responses: `CreateVideoResponse`, `RetrieveMyContentResponse`, `CreatorInfoResponse`
- Market responses: `PurchaseInstantAccessResponse`
- Transaction responses: `TransactionsResponse`, `MyOwnershipResponse`
- Search responses: `SearchForUsersResponse`, `GeneralSearchResponse`
- Upload responses: `UploadVideoResponse`, `UploadThumbnailResponse`

### solana.d.ts
Utility types for Solana blockchain interactions (transfers, pricing).

- `SolPriceDetails`: Current SOL/USD exchange rate
- `MoneyTransferDetails`: Intermediate state during transfer flow (validates username/public key)
- `MoneyTransferData`: Final transfer payload
- `TransferOption`: Destination type (username or public key)
- `TransactionStage`: Multi-step transfer state (initial, review)

### utils.d.ts
Global utility and application-level type constants.

- `PageNames`: All valid routes (static and dynamic)
- `StaticPageNames`: Hardcoded route paths
- `DynamicPageNames`: Parameterized routes (video ID, hashtag, creator, search)
- `Currencies`: SOL or USD denomination
- `SiteThemes`: Light or dark mode
- `PathHeaders`: API endpoint path prefixes
- `AtPrefixedString`: Branded string type for creator usernames (with @ prefix)
- `AscOrDesc`: Sort direction
- `RoundOrFixed`: Number formatting mode
- `DepositOrWithDrawal`: Transaction direction

### videos.d.ts
Video content types for browsing, searching, and displaying video data.

- `VideoDataLessVideoUrlResponse`: Video metadata from API (without streaming URL)
- `VideoDataWithUrlRetrievalStatus`: Extended metadata tracking URL fetch attempts
- `UrlExtendedSingleVideoData`: Complete video data with optional streaming URL
- `TierDataFromDB`: Tier information with sold-out status
- `CreatorData`: Creator profile metadata
- `CreatorDataHeldInClass`: Creator profile with associated video list
- `SearchData`: Union type for search results (video or creator)
- `PostedVideoListingStatuses`: LISTED or SOLDOUT
- `AllVideoListingStatuses`: Combined status types (LISTED, SOLDOUT, UNLISTED)
- `CreatorVideosFilter`: Filtering creator's videos by title, timeframe, lock status
- `HomeScreenVideosToShowCategory`: Content categories (Recent Uploads, Most Popular)

## Organization Patterns

### Global Namespace
All types are declared in the global namespace using `declare global` blocks. This allows them to be used throughout the application without explicit imports.

### Type Relationships
Types follow a layering pattern:
1. **Input types** (form state): `LoginCredentials`, `NewVideoDetails`
2. **Intermediate types** (during processing): `MoneyTransferDetails`
3. **Output types** (API responses): Response types in response-types.d.ts
4. **Data model types** (persisted): `MyContent`, `SolanaTransaction`, `VideoDataLessVideoUrlResponse`

### Naming Conventions
- Request forms: Explicit field names without special prefix
- Sendable payloads: `*ToSend` suffix
- Response objects: `*Response` suffix or specific data type names
- View models/extended data: Descriptive names like `VideoDataWithUrlRetrievalStatus`
- Enums/unions: Generic noun types like `Currencies`, `SiteThemes`, `TransactionTypes`
- Database records: `*FromDB` suffix when distinguishing from request/response versions
- Filter/sort objects: `*Filter` suffix

### Type Composition
Related types use extends/unions for clarity:
- `TierData extends TierDataToSend`: Adds UI-only field (`isPurchaseTierChecked`)
- `CreateVideo extends CommonNewVideoDetails`: Adds backend-required fields
- `GoogleAuthSuccess extends LoginOrRegisterSuccess`: Adds provider-specific field
- `SingleTransaction = SolanaTransaction | MyPurchasedExclusiveContent`: Union for transaction variants

### Branded Types
The `AtPrefixedString` branded type prevents accidental username usage without the @ prefix:
```typescript
type AtPrefixedString = string & { __brand: "AtPrefixedString" }
```

## Guidelines for Adding New Types

1. **Choose the right file**: Organize by feature domain (auth, creator, transactions, etc.)
2. **Use consistent naming**: Follow existing conventions for suffixes and patterns
3. **Document purpose**: Use comments for complex types or unclear relationships
4. **Consider composition**: Extend existing types rather than duplicating fields
5. **Keep layering in mind**: Distinguish between form inputs, API payloads, responses, and data models
6. **Use unions for variants**: When a type can be one of multiple options, use `|` union syntax
