import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class VideoDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getHomePageVideos(): Promise<AxiosResponse<HomePageVideos | ErrorResponse>> {
		return await this.httpClient.http.get<HomePageVideos | ErrorResponse>(
			"/videos/get-home-page-videos", { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideoById(videoUUID: string): Promise<AxiosResponse<RetrievedVideo | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrievedVideo | NonSuccessResponse>(
			`/videos/get-video/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideosByCreatorUsername(creatorUsername: string): Promise<AxiosResponse<CreatorDataResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<CreatorDataResponse | NonSuccessResponse>(
			`/videos/get-creator-videos/${creatorUsername}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideoUrl(videoUUID: string): Promise<AxiosResponse<RetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrievedVideoUrl | NonSuccessResponse>(
			`/videos/get-video-url/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
