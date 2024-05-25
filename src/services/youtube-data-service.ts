import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class YouTubeDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async getUserYouTubeInfo(): Promise<AxiosResponse<UserYouTubeData | ErrorResponse>> {
		return await this.httpClient.http.get<UserYouTubeData | ErrorResponse>(
			`${this.pathHeader}/retrieve-user-youtube-info`
		)
	}
}
