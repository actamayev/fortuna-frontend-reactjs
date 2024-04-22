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
	type LoginOrRegisterSuccess = { accessToken: string }

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		phoneNumber: string | null
		defaultCurrency: Currencies
		defaultSiteTheme: SiteThemes
		profilePictureUrl: string | null
	}

	// Search Responses:
	type SearchForUsersResponse = { usernames: { username: string }[] }

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
	type MyOwnershipResponse = { myOwnershipList: MyOwnership[] }
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
		videoUploadUrl: string
		uploadedVideoId: number
		uuid: string
	}
	type ProfilePictureUrl = { profilePictureUrl: string }

	// Video Responses:
	type RetrievedVideo = { videoData: VideoData }
	type HomePageVideos = { homePageVideos: VideoData[] }
}

export {}
