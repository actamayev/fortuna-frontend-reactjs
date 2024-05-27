import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async retrieveWalletBalance(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<WalletBalanceResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-wallet-balance`
		)
	}

	async requestAirdrop(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.post<WalletBalanceResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/request-airdrop`
		)
	}

	async createAndMintSPL(newSPLData: CreateAndMintSPL): Promise<AxiosResponse<MintSPLResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<MintSPLResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-and-mint-spl`, { newSPLData }
		)
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
