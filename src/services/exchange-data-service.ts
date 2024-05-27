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

	async purchaseExclusiveContentAccess(videoUUID: string): Promise<AxiosResponse<RetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.post<RetrievedVideoUrl | NonSuccessResponse>(
			`${this.pathHeader}/purchase-exclusive-content-access/${videoUUID}`
		)
	}
}
