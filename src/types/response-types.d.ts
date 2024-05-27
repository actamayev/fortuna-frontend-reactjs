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

	// Exchange Resposnes:
	interface PrimarySplTokenPurchaseResponse extends MyOwnership {
		videoUrl: string | undefined
	}

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultCurrency: Currencies
		defaultSiteTheme: SiteThemes
		isApprovedToBeCreator: boolean
		profilePictureUrl: string | null
		publicKey: string
	}

	// Search Responses:
	type SearchForUsersResponse = { usernames: { username: string }[] }
	type GeneralSearchResponse = { searchResults: SearchData[] }

	// Solana Responses:
	type MintSPLResponse = {
		newSPLId: number,
		mintAddress: string
	}
	type RetrieveMyContentResponse = { creatorContentList: MyContent[] }
	type TransferSolResponse = { solTransferData: SolanaTransaction }
	type WalletBalanceResponse = {
		balanceInSol: number
		balanceInUsd: number
		solPriceInUSD: number
		solPriceRetrievedTime: Date
	}
	type TransactionsResponse = { transactions: SolanaTransaction[] }
	type MyOwnershipResponse = {
		myOwnershipList: MyOwnership[]
		myExclusiveContentList: MyExclusiveContentData[]
	}
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
	type UserYouTubeData = {
		isApprovedToBeCreator: boolean
		subscriberCount: number
	}
}

export {}
