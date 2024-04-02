import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"
import FormData from "form-data"

export default class UploadDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async uploadImageToS3(file: File): Promise<AxiosResponse<UploadImageToS3 | MessageResponse | ErrorResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<UploadImageToS3 | MessageResponse | ErrorResponse>(
			"/devnet/upload/upload-image-to-s3", formData, { headers: { "Content-Type": file.type }}
		)
	}
}
