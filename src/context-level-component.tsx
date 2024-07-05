import AuthProvider from "./contexts/auth-context"
import VideoProvider from "./contexts/video-context"
import SolanaProvider from "./contexts/solana-context"
import MarketProvider from "./contexts/market-context"
import CreatorProvider from "./contexts/creator-context"
import PersonalInfoProvider from "./contexts/personal-info-context"
import NotificationsProvider from "./contexts/notifications-context"
import FortunaApiClientProvider from "./contexts/fortuna-api-client-context"
import PositionsAndTransactionsProvider from "./contexts/positions-and-transactions-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<NotificationsProvider>
				<VideoProvider>
					<SolanaProvider>
						<CreatorProvider>
							<PositionsAndTransactionsProvider>
								<MarketProvider>
									<PersonalInfoProvider>
										<FortunaApiClientProvider>
											{children}
										</FortunaApiClientProvider>
									</PersonalInfoProvider>
								</MarketProvider>
							</PositionsAndTransactionsProvider>
						</CreatorProvider>
					</SolanaProvider>
				</VideoProvider>
			</NotificationsProvider>
		</AuthProvider>
	)
}
