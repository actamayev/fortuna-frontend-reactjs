import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SolanaDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async createAndMintSPL(newSPLData: CreateAndMintSPL): Promise<AxiosResponse<MintSPLResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<MintSPLResponse | NonSuccessResponse>("/devnet/solana/create-and-mint-spl", { newSPLData })
	}

	async retrieveMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>(
			"/devnet/solana/get-creator-content-list"
		)
	}

	async retrieveWalletBalance(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<WalletBalanceResponse | MessageResponse | ErrorResponse>("/devnet/solana/get-wallet-balance")
	}

	async transferSolToUsername(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			"/devnet/solana/transfer-sol-to-username", { transferSolData }
		)
	}

	async transferSolToPublicKey(transferSolData: SendingSolTransfer): Promise<AxiosResponse<TransferSolResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<TransferSolResponse | NonSuccessResponse>(
			"/devnet/solana/transfer-sol-to-public-key", { transferSolData }
		)
	}

	async retrieveTransactions(): Promise<AxiosResponse<TransactionsResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<TransactionsResponse | MessageResponse | ErrorResponse>("/devnet/solana/get-transactions")
	}

	async purchaseSplTokens(purchaseSplTokensData: PurchaseSplTokensData): Promise<AxiosResponse<MyOwnership | NonSuccessResponse>> {
		return await this.httpClient.http.post<MyOwnership | NonSuccessResponse>(
			"/devnet/solana/purchase-spl-tokens", { purchaseSplTokensData }
		)
	}

	async retrieveMyOwnership(): Promise<AxiosResponse<MyOwnershipResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<MyOwnershipResponse | MessageResponse | ErrorResponse>("/devnet/solana/get-my-ownership")
	}

	async requestAirdrop(): Promise<AxiosResponse<WalletBalanceResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.post<WalletBalanceResponse | MessageResponse | ErrorResponse>("/devnet/solana/request-airdrop")
	}

	async retrieveSolPrice(): Promise<AxiosResponse<SolPriceResponse | ErrorResponse>> {
		return await this.httpClient.http.get<SolPriceResponse | ErrorResponse>(
			"devnet/solana/get-sol-price", { headers: { "No-Auth-Required": "true" }}
		)
	}
}
