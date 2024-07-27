import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class VideoDataService {
	private readonly pathHeader: PathHeaders = "/videos"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getHomePageData(): Promise<AxiosResponse<HomePageData | ErrorResponse>> {
		return await this.httpClient.http.get<HomePageData | ErrorResponse>(
			`${this.pathHeader}/get-home-page-data`, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async getRecentlyUploadedVideos(): Promise<AxiosResponse<RecentlyUploadedVideos | ErrorResponse>> {
		return await this.httpClient.http.get<RecentlyUploadedVideos | ErrorResponse>(
			`${this.pathHeader}/get-recently-uploaded-videos`, { headers: { "No-Auth-Required": "true" }}
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

	async likeOrUnlikeVideo(videoUUID: string, newLikeStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(`${this.pathHeader}/like-or-unlike-video`, { videoUUID, newLikeStatus })
	}

	async getVideosByTag(videoTag: string): Promise<AxiosResponse<VideoDataLessVideoUrlResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<VideoDataLessVideoUrlResponse | NonSuccessResponse>(
			`${this.pathHeader}/get-videos-by-tag/${videoTag}`
		)
	}
}
