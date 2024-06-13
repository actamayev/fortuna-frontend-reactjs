import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	private readonly pathHeader: PathHeaders = "/solana"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async transferFundsToUsername(
		transferFundsData: TransferFundsData
	): Promise<AxiosResponse<TransferFundsResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferFundsResponse | NonSuccessResponse>(
			`${this.pathHeader}/transfer-funds-to-username`, { transferFundsData }
		)
	}

	async transferFundsToPublicKey(
		transferFundsData: TransferFundsData
	): Promise<AxiosResponse<TransferFundsResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferFundsResponse | NonSuccessResponse>(
			`${this.pathHeader}/transfer-funds-to-public-key`, { transferFundsData }
		)
	}

	async retrieveSolPrice(): Promise<AxiosResponse<SolPriceResponse | ErrorResponse>> {
		return await this.httpClient.http.get<SolPriceResponse | ErrorResponse>(
			`${this.pathHeader}/get-sol-price`, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
