import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PositionsAndTransactionsDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async retrieveMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-creator-content-list`
		)
	}

	async retrieveTransactions(): Promise<AxiosResponse<TransactionsResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<TransactionsResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-transactions`
		)
	}

	async retrieveMyOwnership(): Promise<AxiosResponse<MyOwnershipResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<MyOwnershipResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-my-ownership`
		)
	}
}
