import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SearchDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async searchForUsername(username: string): Promise<AxiosResponse<SearchForUsersResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<SearchForUsersResponse | NonSuccessResponse>(`/devnet/search/username/${username}`)
	}

	async checkIfPublicKeyRegisteredOnFortuna(publicKey: string): Promise<AxiosResponse<BooleanResponse | ErrorResponses>> {
		return await this.httpClient.http.get<BooleanResponse | ErrorResponses>(
			`/devnet/search/check-if-public-key-exists-with-fortuna/${publicKey}`
		)
	}

	async checkIfPublicKeyExistsOnSolana(publicKey: string): Promise<AxiosResponse<BooleanResponse | ErrorResponses>> {
		return await this.httpClient.http.get<BooleanResponse | ErrorResponses>(
			`/devnet/search/check-if-public-key-exists-on-solana/${publicKey}`
		)
	}
}
