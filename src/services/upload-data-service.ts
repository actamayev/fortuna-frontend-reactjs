import FormData from "form-data"
import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class UploadDataService {
	private readonly pathHeader: PathHeaders = "/upload"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async uploadVideoToS3(file: File): Promise<AxiosResponse<UploadVideoToS3 | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<UploadVideoToS3 | NonSuccessResponse>(
			`${this.pathHeader}/upload-video-to-s3`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadImageToS3(file: File, uuid: string): Promise<AxiosResponse<UploadImageToS3 | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)
		formData.append("uuid", uuid)

		return await this.httpClient.http.post<UploadImageToS3 | NonSuccessResponse>(
			`${this.pathHeader}/upload-image-to-s3`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async uploadProfilePicture(file: File): Promise<AxiosResponse<ProfilePictureUrl | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<ProfilePictureUrl | NonSuccessResponse>(
			`${this.pathHeader}/upload-profile-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}
}
