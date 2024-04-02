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
}
