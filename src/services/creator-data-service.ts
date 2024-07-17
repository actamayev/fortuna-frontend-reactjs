import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class CreatorDataService {
	private readonly pathHeader: PathHeaders = "/creator"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-creator-content-list`
		)
	}

	async createVideo(newVideoData: CreateVideo): Promise<AxiosResponse<CreateVideoResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<CreateVideoResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-video`, { newVideoData }
		)
	}

	async getCreatorInfo(): Promise<AxiosResponse<CreatorInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<CreatorInfoResponse | ErrorResponse>(
			`${this.pathHeader}/get-creator-info`
		)
	}

	async editChannelName(channelName: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/edit-channel-name`, { channelName }
		)
	}

	async addOrEditChannelDescription(channelDescription: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/add-or-edit-channel-description`, { channelDescription }
		)
	}

	async addOrEditSocialPlatformLink(
		socialLink: string,
		socialPlatform: SocialPlatformKey
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/add-or-edit-social-platform-link`, { socialLink, socialPlatform }
		)
	}

	async removeSocialPlatformLink(socialPlatform: SocialPlatformKey): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/remove-social-platform-link/${socialPlatform}`
		)
	}

	async removeCurrentProfilePicture(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			`${this.pathHeader}/remove-current-profile-picture`
		)
	}

	async removeCurrentChannelBannerPicture(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			`${this.pathHeader}/remove-current-channel-banner-picture`
		)
	}

	async updateVideoListingStatus(videoUUID: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/update-video-listing-status/${videoUUID}`
		)
	}

	async editVideoName(videoName: string, videoUUID: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/edit-video-name`, { videoName, videoUUID }
		)
	}

	async editVideoDescription(videoDescription: string, videoUUID: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/edit-video-description`, { videoDescription, videoUUID }
		)
	}

	async featureVideo(videoIdToFeature: number, videoIdToUnfeature?: number): Promise<AxiosResponse<ErrorResponses | SuccessResponse>> {
		return await this.httpClient.http.post<ErrorResponses | SuccessResponse>(
			`${this.pathHeader}/feature-video`, { videoIdToFeature, videoIdToUnfeature }
		)
	}
}
