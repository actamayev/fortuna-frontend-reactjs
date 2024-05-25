import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class PersonalInfoDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-personal-info`
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

	async retrieveWalletPublicKey(): Promise<AxiosResponse<PublicKeyResponse | MessageResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PublicKeyResponse | MessageResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-wallet-public-key`
		)
	}
}
