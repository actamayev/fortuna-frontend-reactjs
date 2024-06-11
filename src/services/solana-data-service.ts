import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	private readonly pathHeader: PathHeaders = "/solana"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async transferSolToUsername(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			`${this.pathHeader}/transfer-sol-to-username`, { transferSolData }
		)
	}

	async transferSolToPublicKey(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			`${this.pathHeader}/transfer-sol-to-public-key`, { transferSolData }
		)
	}

	async retrieveSolPrice(): Promise<AxiosResponse<SolPriceResponse | ErrorResponse>> {
		return await this.httpClient.http.get<SolPriceResponse | ErrorResponse>(
			`${this.pathHeader}/get-sol-price`, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
