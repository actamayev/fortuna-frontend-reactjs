import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async retrieveWalletBalance(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<WalletBalanceResponse | MessageResponse | ErrorResponse>("/solana/get-wallet-balance")
	}

	async requestAirdrop(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.post<WalletBalanceResponse | MessageResponse | ErrorResponse>("/solana/request-airdrop")
	}

	async createAndMintSPL(newSPLData: CreateAndMintSPL): Promise<AxiosResponse<MintSPLResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<MintSPLResponse | NonSuccessResponse>("/solana/create-and-mint-spl", { newSPLData })
	}

	async retrieveMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>(
			"/solana/get-creator-content-list"
		)
	}

	async transferSolToUsername(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			"/solana/transfer-sol-to-username", { transferSolData }
		)
	}

	async transferSolToPublicKey(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			"/solana/transfer-sol-to-public-key", { transferSolData }
		)
	}

	async retrieveTransactions(): Promise<AxiosResponse<TransactionsResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<TransactionsResponse | MessageResponse | ErrorResponse>("/solana/get-transactions")
	}

	async retrieveMyOwnership(): Promise<AxiosResponse<MyOwnershipResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<MyOwnershipResponse | MessageResponse | ErrorResponse>("/solana/get-my-ownership")
	}

	async retrieveSolPrice(): Promise<AxiosResponse<SolPriceResponse | ErrorResponse>> {
		return await this.httpClient.http.get<SolPriceResponse | ErrorResponse>(
			"/solana/get-sol-price", { headers: { "No-Auth-Required": "true" }}
		)
	}
}
