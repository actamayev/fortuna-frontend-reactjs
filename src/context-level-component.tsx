import AuthProvider from "./contexts/auth-context"
import FiftyoneApiClientProvider from "./contexts/fiftyone-api-client-context"
import PersonalInfoProvider from "./contexts/personal-info-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<PersonalInfoProvider>
				<FiftyoneApiClientProvider>
					{children}
				</FiftyoneApiClientProvider>
			</PersonalInfoProvider>
		</AuthProvider>
	)
}
