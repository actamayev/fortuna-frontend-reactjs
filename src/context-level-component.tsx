import AuthProvider from "./contexts/auth-context"
import PersonalInfoProvider from "./contexts/personal-info-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {

	return (
		<AuthProvider>
			<PersonalInfoProvider>
				{children}
			</PersonalInfoProvider>
		</AuthProvider>
	)
}
