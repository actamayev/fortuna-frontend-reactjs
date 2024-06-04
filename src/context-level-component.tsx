import AuthProvider from "./contexts/auth-context"
import VideoProvider from "./contexts/video-context"
import SolanaProvider from "./contexts/solana-context"
import YouTubeProvider from "./contexts/youtube-context"
import MarketProvider from "./contexts/market-context"
import PersonalInfoProvider from "./contexts/personal-info-context"
import FortunaApiClientProvider from "./contexts/fortuna-api-client-context"
import PositionsAndTransactionsProvider from "./contexts/positions-and-transactions-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<VideoProvider>
				<SolanaProvider>
					<PositionsAndTransactionsProvider>
						<MarketProvider>
							<PersonalInfoProvider>
								<YouTubeProvider>
									<FortunaApiClientProvider>
										{children}
									</FortunaApiClientProvider>
								</YouTubeProvider>
							</PersonalInfoProvider>
						</MarketProvider>
					</PositionsAndTransactionsProvider>
				</SolanaProvider>
			</VideoProvider>
		</AuthProvider>
	)
}
