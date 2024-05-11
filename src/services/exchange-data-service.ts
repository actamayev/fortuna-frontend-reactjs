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

	async placeSecondaryMarketSplBid(createSplBid: CreateSPLBidData): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>("/exchange/create-spl-bid", { createSplBid })
	}

	async placeSecondaryMarketSplAsk(createSplAsk: CreateSPLAskData): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>("/exchange/primary-spl-token-purchase", { createSplAsk })
	}
}
