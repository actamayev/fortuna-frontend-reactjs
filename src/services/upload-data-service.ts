import FormData from "form-data"
import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class UploadDataService {
	private readonly pathHeader: PathHeaders = "/upload"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async uploadVideo(file: File): Promise<AxiosResponse<UploadVideoResponse | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<UploadVideoResponse | NonSuccessResponse>(
			`${this.pathHeader}/upload-video`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadThumbnailPicture(file: File, uuid: string): Promise<AxiosResponse<UploadThumbnailResponse | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)
		formData.append("uuid", uuid)

		return await this.httpClient.http.post<UploadThumbnailResponse | NonSuccessResponse>(
			`${this.pathHeader}/upload-thumbnail-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadNewThumbnailPicture(file: File, videoId: number): Promise<AxiosResponse<UploadNewThumbnailResponse | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)
		formData.append("videoId", videoId)

		return await this.httpClient.http.post<UploadNewThumbnailResponse | NonSuccessResponse>(
			`${this.pathHeader}/upload-new-thumbnail-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadProfilePicture(file: File): Promise<AxiosResponse<ProfilePictureUrl | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<ProfilePictureUrl | NonSuccessResponse>(
			`${this.pathHeader}/upload-profile-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadChannelBannerPicture(file: File): Promise<AxiosResponse<ChannelBannerPictureUrl | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<ChannelBannerPictureUrl | NonSuccessResponse>(
			`${this.pathHeader}/upload-channel-banner-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}
}
