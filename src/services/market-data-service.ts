import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class MarketDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async purchaseExclusiveContentAccess(
		videoUUID: string,
		tierNumber: number
	): Promise<AxiosResponse<DefiniteRetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.post<DefiniteRetrievedVideoUrl | NonSuccessResponse>(
			`${this.pathHeader}/purchase-instant-exclusive-content-access`, { videoUUID, tierNumber }
		)
	}
}
