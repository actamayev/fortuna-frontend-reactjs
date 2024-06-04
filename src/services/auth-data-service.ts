import { AxiosResponse } from "axios"
import FortunaHttpClient from "../classes/fortuna-http-client"

export default class AuthDataService {
	constructor(private readonly pathHeader: PathHeaders, private readonly httpClient: FortunaHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			`${this.pathHeader}/login`, { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			`${this.pathHeader}/logout`
		)
	}

	async register(registerInformation: RegisterCredentialsToSend): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			`${this.pathHeader}/register`, { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async googleLoginCallback(idToken: string, siteTheme: SiteThemes): Promise<AxiosResponse<GoogleAuthSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<GoogleAuthSuccess | ErrorResponses>(
			`${this.pathHeader}/google-auth/login-callback`, { idToken, siteTheme }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async registerUsername(username: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/set-username`, { username }
		)
	}

	async youtubeCallback(code: string): Promise<AxiosResponse<UserYouTubeData | NonSuccessResponse>> {
		return await this.httpClient.http.post<UserYouTubeData | NonSuccessResponse>(
			`${this.pathHeader}/google-auth/youtube-callback`, { code }
		)
	}
}
