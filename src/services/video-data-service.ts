import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class VideoDataService {
	private readonly pathHeader: PathHeaders = "/videos"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getHomePageVideos(): Promise<AxiosResponse<HomePageVideos | ErrorResponse>> {
		return await this.httpClient.http.get<HomePageVideos | ErrorResponse>(
			`${this.pathHeader}/get-home-page-videos`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideoById(videoUUID: string): Promise<AxiosResponse<RetrievedVideo | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrievedVideo | NonSuccessResponse>(
			`${this.pathHeader}/get-video/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideosByCreatorUsername(creatorUsername: string): Promise<AxiosResponse<CreatorDataResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<CreatorDataResponse | NonSuccessResponse>(
			`${this.pathHeader}/get-creator-videos/${creatorUsername}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getVideoUrl(videoUUID: string): Promise<AxiosResponse<RetrievedVideoUrl | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrievedVideoUrl | NonSuccessResponse>(
			`${this.pathHeader}/get-video-url/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async likeOrDislikeVideo(videoUUID: string, likeStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(`${this.pathHeader}/like-or-dislike-video`, { videoUUID, likeStatus })
	}

	async removeLikeOrDislikeFromVideo(videoUUID: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(`${this.pathHeader}/remove-like-or-dislike-from-video`, { videoUUID })}
}
