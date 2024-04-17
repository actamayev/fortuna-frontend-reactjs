import AuthProvider from "./contexts/auth-context"
import VideoProvider from "./contexts/video-context"
import SolanaProvider from "./contexts/solana-context"
import PersonalInfoProvider from "./contexts/personal-info-context"
import FortunaApiClientProvider from "./contexts/fortuna-api-client-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<VideoProvider>
				<SolanaProvider>
					<PersonalInfoProvider>
						<FortunaApiClientProvider>
							{children}
						</FortunaApiClientProvider>
					</PersonalInfoProvider>
				</SolanaProvider>
			</VideoProvider>
		</AuthProvider>
	)
}
