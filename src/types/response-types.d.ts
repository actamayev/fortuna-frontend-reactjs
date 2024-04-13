declare global {
	// Common Responses:
	type SuccessResponse = { success: string }
	type MessageResponse = { message: string }
	type ValidationErrorResponse = { validationError: string }
	type ErrorResponse = { error: string }
	type ErrorResponses = ValidationErrorResponse | ErrorResponse
	type NonSuccessResponse = MessageResponse | ErrorResponses
	type AllCommonResponses = SuccessResponse | NonSuccessResponse

	//Auth Responses:
	type LoginSuccess = { accessToken: string }
	type RegisterSuccess = { accessToken: string }

	// Search Responses:
	type SearchForUsersResponse = { usernames: { username: string }[] }
	type BooleanResponse = { exists: boolean }

	// Solana Responses:
	type MintSPLResponse = { newSPLId: number, mintAddress: string }
	type RetrieveMyContentResponse = { creatorContentList: MyContent[] }

	type TransferSolResponse = { solTransferData: SolanaTransaction }

	type WalletBalanceResponse = {
		balanceInSol: number,
		balanceInUsd: number,
		solPriceInUSD: number,
		solPriceRetrievedTime: Date
	}

	type TransactionsResponse = {
		transactions: SolanaTransaction[]
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
}

export {}
