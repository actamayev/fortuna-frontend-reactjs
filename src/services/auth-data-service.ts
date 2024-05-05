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

	async googleLoginCallback(idToken: string): Promise<AxiosResponse<GoogleAuthSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<GoogleAuthSuccess | ErrorResponses>(
			"/auth/google-auth/login-callback", { idToken }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async registerUsername(username: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>("/auth/set-username", { username })
	}

	async youtubeCallback(code: string): Promise<AxiosResponse<UserYouTubeData | NonSuccessResponse>> {
		return await this.httpClient.http.post<UserYouTubeData | NonSuccessResponse>("/auth/google-auth/youtube-callback", { code })
	}
}
