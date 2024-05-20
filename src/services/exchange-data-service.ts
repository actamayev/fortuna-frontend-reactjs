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

	async placeSplBid(createSplBid: CreateSPLBidData): Promise<AxiosResponse<AllCommonResponses | BidResponse>> {
		return await this.httpClient.http.post<AllCommonResponses | BidResponse>("/exchange/create-spl-bid", { createSplBid })
	}

	async placeSplAsk(createSplAsk: CreateSPLAskData): Promise<AxiosResponse<AllCommonResponses | AskResponse>> {
		return await this.httpClient.http.post<AllCommonResponses | AskResponse>("/exchange/create-spl-ask", { createSplAsk })
	}

	async retrieveOrders(): Promise<AxiosResponse<RetrievedOrdersResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrievedOrdersResponse | MessageResponse | ErrorResponse>("/exchange/retrieve-my-orders")
	}
}
