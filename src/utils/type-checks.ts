/* eslint-disable @typescript-eslint/no-explicit-any */
export function isErrorResponse(data: any): data is ErrorResponse {
	return data && typeof data.error === "string"
}

export function isValidationErrorResponse(data: any): data is ValidationErrorResponse {
	return data && typeof data.validationError === "string"
}

export function isMessageResponse(data: any): data is MessageResponse {
	return data && typeof data.message === "string"
}

export function isNonSuccessResponse(data: any): data is NonSuccessResponse {
	return isErrorResponse(data) || isValidationErrorResponse(data) || isMessageResponse(data)
}

export function isErrorResponses(data: any): data is ErrorResponses {
	return isErrorResponse(data) || isValidationErrorResponse(data)
}

export function isValidCurrency(value: any): value is Currencies {
	return ["sol", "usd"].includes(value)
}

export function isValidSiteTheme(value: any): value is SiteThemes {
	return ["light", "dark"].includes(value)
}

export function isVideoData(data: SearchData): data is VideoData {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (data as VideoData).videoUrl !== undefined
}

export function isSplBid(data: MyOrder): data is BidOrderData {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (data as BidOrderData).secondaryMarketBidId !== undefined
}
