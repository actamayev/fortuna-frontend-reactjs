/* eslint-disable max-len */
import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import VideoDataService from "../services/video-data-service"
import FortunaHttpClient from "../classes/fortuna-http-client"
import UploadDataService from "../services/upload-data-service"
import SolanaDataService from "../services/solana-data-service"
import SearchDataService from "../services/search-data-service"
import YouTubeDataService from "../services/youtube-data-service"
import MarketDataService from "../services/market-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"
import PositionsAndTransactionsDataService from "../services/positions-and-transactions-data-service"

class FortunaApiClient {
	public httpClient: FortunaHttpClient = new FortunaHttpClient()
	public authDataService: AuthDataService = new AuthDataService("/auth", this.httpClient)
	public marketDataService: MarketDataService = new MarketDataService("/market", this.httpClient)
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService("/personal-info", this.httpClient)
	public positionsAndTransactionsDataService: PositionsAndTransactionsDataService = new PositionsAndTransactionsDataService("/positions-and-transactions", this.httpClient)
	public searchDataService: SearchDataService = new SearchDataService("/search", this.httpClient)
	public solanaDataService: SolanaDataService = new SolanaDataService("/solana", this.httpClient)
	public uploadDataService: UploadDataService = new UploadDataService("/upload", this.httpClient)
	public videoDataService: VideoDataService = new VideoDataService("/videos", this.httpClient)
	public youtubeDataService: YouTubeDataService = new YouTubeDataService("/youtube", this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FortunaHttpClient()
		this.authDataService = new AuthDataService("/auth", this.httpClient)
		this.marketDataService = new MarketDataService("/market", this.httpClient)
		this.personalInfoDataService = new PersonalInfoDataService("/personal-info", this.httpClient)
		this.positionsAndTransactionsDataService = new PositionsAndTransactionsDataService("/positions-and-transactions", this.httpClient)
		this.searchDataService = new SearchDataService("/search", this.httpClient)
		this.solanaDataService = new SolanaDataService("/solana", this.httpClient)
		this.uploadDataService = new UploadDataService("/upload", this.httpClient)
		this.videoDataService = new VideoDataService("/videos", this.httpClient)
		this.youtubeDataService = new YouTubeDataService("/youtube", this.httpClient)
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
