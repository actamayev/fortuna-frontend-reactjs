import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: FortunaHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<AuthSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<AuthSuccess | NonSuccessResponse>(
			"/devnet/auth/login", { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>("/devnet/auth/logout")
	}

	async register(registerInformation: RegisterCredentialsToSend): Promise<AxiosResponse<AuthSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<AuthSuccess | NonSuccessResponse>(
			"/devnet/auth/register", { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
