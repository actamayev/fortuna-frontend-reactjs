import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class CreatorDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async retrieveMyContent(): Promise<AxiosResponse<RetrieveMyContentResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveMyContentResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/get-creator-content-list`
		)
	}

	async createVideo(newVideoData: CreateVideo): Promise<AxiosResponse<CreateVideoResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<CreateVideoResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-video`, { newVideoData }
		)
	}
}
