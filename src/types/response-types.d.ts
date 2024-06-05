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
	type LoginOrRegisterSuccess = { accessToken: string, publicKey: string }
	type GoogleAuthSuccess = { accessToken: string, isNewUser: boolean, publicKey: string }

	// Creator Responses:
	type CreateVideoResponse = { newVideoId: number }
	type RetrieveMyContentResponse = { creatorContentList: MyContent[] }

	// Market Resposnes:
	type DefiniteRetrievedVideoUrl = { videoUrl: string }

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultCurrency: Currencies
		defaultSiteTheme: SiteThemes
		profilePictureUrl: string | null
		publicKey: string
	}

	// Positions and Transactions Responses:
	type TransactionsResponse = { transactions: SolanaTransaction[] }
	type MyOwnershipResponse = { myPurchasedExclusiveContent: MyPurchasedExclusiveContent[] }

	// Search Responses:
	type SearchForUsersResponse = { usernames: { username: string }[] }
	type GeneralSearchResponse = { searchResults: SearchData[] }

	// Solana Responses:
	type TransferSolResponse = { solTransferData: SolanaTransaction }
	type SolPriceResponse = {
		solPriceInUSD: number
		lastRetrievedTime: Date
	}

	// Upload Responses:
	type UploadImageToS3 = {
		imageUploadUrl: string
		uploadedImageId: number
	}
	type UploadVideoToS3 = {
		uploadedVideoId: number
		uuid: string
	}
	type ProfilePictureUrl = { profilePictureUrl: string }

	// Video Responses:
	type RetrievedVideo = { videoData: SingleVideoDataFromBackend }
	type HomePageVideos = { homePageVideos: VideoDataLessVideoUrl[] }
	type CreatorDataResponse = {
		videoData: VideoDataLessVideoUrl[]
		creatorData: CreatorData
	}
	type RetrievedVideoUrl = { videoUrl: string | undefined }

	// YouTube Responses:
	type UserYouTubeData = { subscriberCount: number }
}

export {}
