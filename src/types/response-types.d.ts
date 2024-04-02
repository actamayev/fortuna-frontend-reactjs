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

	// Solana Responses:
	type MintSPLResponse = { mintAddress: string }

	// Upload Responses:
	type UploadImageToS3 = {
		imageUploadUrl: string
		fileName: string
		uuid: string
		uploadedImageId: number
	}
}

export {}
