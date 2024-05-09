import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import VideoDataService from "../services/video-data-service"
import FortunaHttpClient from "../classes/fortuna-http-client"
import UploadDataService from "../services/upload-data-service"
import SolanaDataService from "../services/solana-data-service"
import SearchDataService from "../services/search-data-service"
import YouTubeDataService from "../services/youtube-data-service"
import ExchangeDataService from "../services/exchange-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"

class FortunaApiClient {
	public httpClient: FortunaHttpClient = new FortunaHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)
	public exchangeDataService: ExchangeDataService = new ExchangeDataService(this.httpClient)
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient)
	public searchDataService: SearchDataService = new SearchDataService(this.httpClient)
	public solanaDataService: SolanaDataService = new SolanaDataService(this.httpClient)
	public uploadDataService: UploadDataService = new UploadDataService(this.httpClient)
	public videoDataService: VideoDataService = new VideoDataService(this.httpClient)
	public youtubeDataService: YouTubeDataService = new YouTubeDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FortunaHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
		this.exchangeDataService = new ExchangeDataService(this.httpClient)
		this.personalInfoDataService = new PersonalInfoDataService(this.httpClient)
		this.searchDataService = new SearchDataService(this.httpClient)
		this.solanaDataService = new SolanaDataService(this.httpClient)
		this.uploadDataService = new UploadDataService(this.httpClient)
		this.videoDataService = new VideoDataService(this.httpClient)
		this.youtubeDataService = new YouTubeDataService(this.httpClient)
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
