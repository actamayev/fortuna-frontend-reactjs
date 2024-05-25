import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class ExchangeDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async primarySplTokenPurchase(purchaseSplTokensData: PurchaseSplTokensData): Promise<AxiosResponse<MyOwnership | NonSuccessResponse>> {
		return await this.httpClient.http.post<MyOwnership | NonSuccessResponse>(
			"/exchange/primary-spl-token-purchase", { purchaseSplTokensData }
		)
	}

	async placeSplBid(createSplBid: CreateSPLBidData): Promise<AxiosResponse<BidOrderResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<BidOrderResponse | NonSuccessResponse>("/exchange/create-spl-bid", { createSplBid })
	}

	async placeSplAsk(createSplAsk: CreateSPLAskData): Promise<AxiosResponse<AskOrderResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AskOrderResponse | NonSuccessResponse>("/exchange/create-spl-ask", { createSplAsk })
	}

	async retrieveOrders(): Promise<AxiosResponse<RetrievedOrdersResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrievedOrdersResponse | MessageResponse | ErrorResponse>("/exchange/retrieve-my-orders")
	}

	async purchaseExclusiveContentAccess(videoUUID: string): Promise<AxiosResponse<RetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.post<RetrievedVideoUrl | NonSuccessResponse>(
			"/exchange/purchase-exclusive-content-access", { videoUUID }
		)
	}
}
