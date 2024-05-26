import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class ExchangeDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async primarySplTokenPurchase(
		purchaseSplTokensData: PurchaseSplTokensData
	): Promise<AxiosResponse<PrimarySplTokenPurchaseResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<PrimarySplTokenPurchaseResponse | NonSuccessResponse>(
			`${this.pathHeader}/primary-spl-token-purchase`, { purchaseSplTokensData }
		)
	}

	async placeSplBid(createSplBid: CreateSPLBidData): Promise<AxiosResponse<BidOrderResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<BidOrderResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-spl-bid`, { createSplBid }
		)
	}

	async placeSplAsk(createSplAsk: CreateSPLAskData): Promise<AxiosResponse<AskOrderResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AskOrderResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-spl-ask`, { createSplAsk }
		)
	}

	async retrieveOrders(): Promise<AxiosResponse<RetrievedOrdersResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrievedOrdersResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-my-orders`
		)
	}

	async purchaseExclusiveContentAccess(videoUUID: string): Promise<AxiosResponse<RetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.post<RetrievedVideoUrl | NonSuccessResponse>(
			`${this.pathHeader}/purchase-exclusive-content-access/${videoUUID}`
		)
	}
}
