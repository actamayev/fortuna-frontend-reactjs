import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PositionsAndTransactionsDataService {
	private readonly pathHeader: PathHeaders = "/positions-and-transactions"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async retrieveTransactions(): Promise<AxiosResponse<TransactionsResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<TransactionsResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-transactions`
		)
	}

	async retrieveMyPurchasedExclusiveContent(): Promise<AxiosResponse<MyOwnershipResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<MyOwnershipResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-my-purchased-exclusive-content`
		)
	}
}
