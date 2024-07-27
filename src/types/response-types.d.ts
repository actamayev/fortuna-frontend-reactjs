declare global {
	// Common Responses:
	type SuccessResponse = { success: string }
	type MessageResponse = { message: string }
	type ValidationErrorResponse = { validationError: string }
	type ErrorResponse = { error: string }
	type ErrorResponses = ValidationErrorResponse | ErrorResponse
	type NonSuccessResponse = MessageResponse | ErrorResponses
	type AllCommonResponses = SuccessResponse | NonSuccessResponse
	type BooleanResponse = { exists: boolean }

	//Auth Responses:
	type LoginOrRegisterSuccess = {
		accessToken: string
		publicKey: string
	}
	type GoogleAuthSuccess = LoginOrRegisterSuccess & { isNewUser: boolean }

	// Creator Responses:
	type CreateVideoResponse = {
		newVideoId: number
		videoTags: VideoTags[]
	}
	type RetrieveMyContentResponse = { creatorContentList: MyContent[] }
	type CreatorInfoResponse = {
		channelName: string | null
		channelDescription: string | null
		profilePictureUrl: string | null
		channelBannerUrl: string | null
		socialPlatformLinks: SocialPlatformLinks[]
	}

	type AddVideoTag = { videoTagId: number }

	// Market Resposnes:
	type PurchaseInstantAccessResponse = {
		videoUrl: string
		isTierSoldOut: boolean
		isVideoSoldOut: boolean
		purchaseDate: Date
		priceInSol: number
		priceInUsd: number
		newWalletBalanceSol: number
		newWalletBalanceUsd: number
		videoAccessPurchaseTransactionSignature: string
	}

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultCurrency: Currencies
		defaultSiteTheme: SiteThemes
		publicKey: string
	}

	// Positions and Transactions Responses:
	type TransactionsResponse = { transactions: SolanaTransaction[] }
	type MyOwnershipResponse = { myPurchasedExclusiveContent: MyPurchasedExclusiveContent[] }

	// Search Responses:
	type SearchForUsersResponse = {
		usernames: {
			username: string
		}[]
	}
	type GeneralSearchResponse = { searchResults: SearchData[] }

	// Solana Responses:
	type TransferFundsResponse = { solTransferData: SolanaTransaction }
	type SolPriceResponse = {
		solPriceInUSD: number
		lastRetrievedTime: Date
	}

	// Upload Responses:
	type UploadNewThumbnailResponse = { imageUploadUrl: string }
	type UploadThumbnailResponse = UploadNewThumbnailResponse & { uploadedImageId: number }
	type UploadVideoResponse = {
		uploadedVideoId: number
		uuid: string
		videoDurationSeconds: number
	}
	type ProfilePictureUrl = { profilePictureUrl: string }
	type ChannelBannerPictureUrl = { channelBannerPictureUrl: string }

	// Video Responses:
	type RetrievedVideo = { videoData: UrlExtendedSingleVideoData }
	type HomePageData = {
		recentlyPostedVideos: VideoDataLessVideoUrlResponse[]
		mostLikedVideos: VideoDataLessVideoUrlResponse[]
		homePageCreatorData: CreatorData[]
	}

	type RecentlyUploadedVideos = { recentlyPostedVideos: VideoDataLessVideoUrlResponse[] }

	type CreatorDataResponse = {
		videoData: VideoDataLessVideoUrlResponse[]
		creatorData: CreatorData
	}
	type RetrievedVideoUrl = { videoUrl: string | undefined }
}

export {}
