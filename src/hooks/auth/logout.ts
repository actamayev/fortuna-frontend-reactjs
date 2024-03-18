import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fiftyone-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const eventfullApiClient = useApiClientContext()

	const logout = (): void => {
		authClass.logout()
		eventfullApiClient.logout()
		personalInfoClass?.logout()
		sessionStorage.clear()
	}

	return logout
}
