import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import FortunaHttpClient from "../classes/fortuna-http-client"

export class FortunaApiClient {
	public httpClient: FortunaHttpClient = new FortunaHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FortunaHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
	}

	public logout() {
		this.httpClient.accessToken = null
		this.initializeServices()
	}
}

const FortunaApiClientContext = createContext(new FortunaApiClient())

export default function FortunaApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new FortunaApiClient(), [])

	return (
		<FortunaApiClientContext.Provider value={apiClientClass}>
			{children}
		</FortunaApiClientContext.Provider>
	)
}

export const useApiClientContext = () => useContext(FortunaApiClientContext)
