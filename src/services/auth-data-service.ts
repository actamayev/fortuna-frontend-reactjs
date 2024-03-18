import { AxiosResponse } from "axios"
import FiftyoneHttpClient from "../classes/fiftyone-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: FiftyoneHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<AuthSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<AuthSuccess | NonSuccessResponse>(
			"/auth/login", { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>("/auth/logout")
	}

	async register(registerInformation: RegisterCredentials): Promise<AxiosResponse<AuthSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<AuthSuccess | NonSuccessResponse>(
			"/auth/register", { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
