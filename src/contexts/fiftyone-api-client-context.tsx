import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import FiftyoneHttpClient from "../classes/fiftyone-http-client"

export class FiftyoneApiClient {
	public httpClient: FiftyoneHttpClient = new FiftyoneHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FiftyoneHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
	}

	public logout() {
		this.httpClient.accessToken = null
		this.initializeServices()
	}
}

const FiftyoneApiClientContext = createContext(new FiftyoneApiClient())

export default function FiftyoneApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new FiftyoneApiClient(), [])

	return (
		<FiftyoneApiClientContext.Provider value={apiClientClass}>
			{children}
		</FiftyoneApiClientContext.Provider>
	)
}

export const useApiClientContext = () => useContext(FiftyoneApiClientContext)
