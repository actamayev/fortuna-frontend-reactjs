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
	type MintSPLResponse = { splId: number, mintAddress: string }
	type RetrieveMyContentResponse = {
		spl_id: number,
		public_key_address: string
	} // TODO: add stuff here.

	// Upload Responses:
	type UploadImageToS3 = {
		imageUploadUrl: string
		fileName: string
		uuid: string
		uploadedImageId: number
	}
}

export {}
