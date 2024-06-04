import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class MarketDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async primarySplTokenPurchase(
		purchaseSplTokensData: PurchaseSplTokensData
	): Promise<AxiosResponse<PrimarySplTokenPurchaseResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<PrimarySplTokenPurchaseResponse | NonSuccessResponse>(
			`${this.pathHeader}/primary-spl-token-purchase`, { purchaseSplTokensData }
		)
	}

	async purchaseExclusiveContentAccess(videoUUID: string): Promise<AxiosResponse<DefiniteRetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.post<DefiniteRetrievedVideoUrl | NonSuccessResponse>(
			`${this.pathHeader}/purchase-instant-exclusive-content-access/${videoUUID}`
		)
	}
}
