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
	interface RetrieveMyContentResponse {
		creatorContentList : {
			splId: number
			splName: string
			numberOfShares: number
			offeringSharePriceSol: number
			description: string
			creatorOwnershipPercentage: number
			imageUrl: string
			videoUrl: string
			mintAddress: string
		}[]
	}

	type WalletBalanceResponse = {
		balanceInSol: number,
		balanceInUsd: number,
		solPriceInUSD: number,
		solPriceRetrievedTime: Date
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
