/* eslint-disable max-len */
import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import VideoDataService from "../services/video-data-service"
import FortunaHttpClient from "../classes/fortuna-http-client"
import UploadDataService from "../services/upload-data-service"
import SolanaDataService from "../services/solana-data-service"
import SearchDataService from "../services/search-data-service"
import MarketDataService from "../services/market-data-service"
import YouTubeDataService from "../services/youtube-data-service"
import CreatorDataService from "../services/creator-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"
import PositionsAndTransactionsDataService from "../services/positions-and-transactions-data-service"

class FortunaApiClient {
	public httpClient: FortunaHttpClient = new FortunaHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)
	public creatorDataService: CreatorDataService = new CreatorDataService(this.httpClient)
	public marketDataService: MarketDataService = new MarketDataService(this.httpClient)
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient)
	public positionsAndTransactionsDataService: PositionsAndTransactionsDataService = new PositionsAndTransactionsDataService(this.httpClient)
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
		this.creatorDataService = new CreatorDataService(this.httpClient)
		this.marketDataService = new MarketDataService(this.httpClient)
		this.personalInfoDataService = new PersonalInfoDataService(this.httpClient)
		this.positionsAndTransactionsDataService = new PositionsAndTransactionsDataService(this.httpClient)
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
