import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			"/auth/login", { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>("/auth/logout")
	}

	async register(registerInformation: RegisterCredentialsToSend): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			"/auth/register", { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
