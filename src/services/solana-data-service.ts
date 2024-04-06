import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async createAndMintSPL(newSPLData: CreateAndMintSPL): Promise<AxiosResponse<MintSPLResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<MintSPLResponse | NonSuccessResponse>(
			"/devnet/solana/create-and-mint-spl", { newSPLData }
		)
	}

	async retrieveMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>("/devnet/solana/get-creator-content-list")
	}

	async retrieveWalletBalance(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<WalletBalanceResponse | MessageResponse | ErrorResponse>("/devnet/solana/get-wallet-balance")
	}
}
