import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class VideoDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async getVideoById(videoUUID: string): Promise<AxiosResponse<RetrievedVideo | ErrorResponse>> {
		return await this.httpClient.http.get<RetrievedVideo | ErrorResponse>(
			`/devnet/videos/get-video/${videoUUID}`, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
