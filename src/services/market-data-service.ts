import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class MarketDataService {
	private readonly pathHeader: PathHeaders = "/market"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async purchaseExclusiveContentAccess(
		videoUUID: string,
		tierNumber: number
	): Promise<AxiosResponse<PurchaseInstantAccessResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<PurchaseInstantAccessResponse | NonSuccessResponse>(
			`${this.pathHeader}/purchase-instant-exclusive-content-access`, { videoUUID, tierNumber }
		)
	}
}
