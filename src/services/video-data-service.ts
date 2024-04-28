import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class VideoDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getVideoById(videoUUID: string): Promise<AxiosResponse<RetrievedVideo | ErrorResponses>> {
		return await this.httpClient.http.get<RetrievedVideo | ErrorResponses>(
			`/videos/get-video/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getHomePageVideos(): Promise<AxiosResponse<HomePageVideos | ErrorResponse>> {
		return await this.httpClient.http.get<HomePageVideos | ErrorResponse>(
			"/videos/get-home-page-videos", { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideosByCreatorUsername(creatorUsername: string): Promise<AxiosResponse<CreatorDataResponse | ErrorResponses>> {
		return await this.httpClient.http.get<CreatorDataResponse | ErrorResponses>(
			`/videos/get-creator-videos/${creatorUsername}`, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
