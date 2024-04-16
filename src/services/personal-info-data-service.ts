import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PersonalInfoDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>("/devnet/personal-info/retrieve-personal-info")
	}
}
