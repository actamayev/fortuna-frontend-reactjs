import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PersonalInfoDataService {
	private readonly pathHeader: PathHeaders = "/personal-info"

	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>(
			`${this.pathHeader}/get-personal-info`
		)
	}

	async setDefaultCurrency(newCurrency: Currencies): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/set-default-currency/${newCurrency}`
		)
	}

	async setDefaultSiteTheme(newSiteTheme: SiteThemes): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/set-default-site-theme/${newSiteTheme}`
		)
	}
}
