import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class SearchDataService {
	private readonly pathHeader: PathHeaders = "/search"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async searchForUsername(username: string): Promise<AxiosResponse<SearchForUsersResponse | ErrorResponses>> {
		return await this.httpClient.http.get<SearchForUsersResponse | ErrorResponses>(
			`${this.pathHeader}/username/${username}`
		)
	}

	async checkIfPublicKeyRegisteredOnFortuna(publicKey: string): Promise<AxiosResponse<BooleanResponse | ErrorResponses>> {
		return await this.httpClient.http.get<BooleanResponse | ErrorResponses>(
			`${this.pathHeader}/check-if-public-key-exists-with-fortuna/${publicKey}`
		)
	}

	async generalSearch(searchTerm: string): Promise<AxiosResponse<GeneralSearchResponse | ErrorResponses>> {
		return await this.httpClient.http.get<GeneralSearchResponse | ErrorResponses>(
			`${this.pathHeader}/general-search/${searchTerm}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideosByTag(videoTag: string): Promise<AxiosResponse<VideoTagResponse | ErrorResponses>> {
		return await this.httpClient.http.get<VideoTagResponse | ErrorResponses>(
			`${this.pathHeader}/get-videos-by-tag/${videoTag}`
		)
	}
}
