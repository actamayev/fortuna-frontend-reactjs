import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class UploadDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async uploadImageToS3(image: File): Promise<AxiosResponse<UploadImageToS3 | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.post<UploadImageToS3 | MessageResponse | ErrorResponse>(
			"/devnet/upload/upload-image-to-s3", { image }
		)
	}
}
