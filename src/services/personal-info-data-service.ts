import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PersonalInfoDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>("/devnet/personal-info/retrieve-personal-info")
	}

	async setDefaultCurrency(newCurrency: Currencies): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`/devnet/personal-info/set-default-currency/${newCurrency}`
		)
	}

	async setDefaultSiteTheme(newSiteTheme: SiteThemes): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`/devnet/personal-info/set-default-site-theme/${newSiteTheme}`
		)
	}
}
