import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { useCallback } from "react"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()

	const logout = useCallback((): void => {
		personalInfoClass?.logout()
		authClass.logout()
		fortunaApiClient.logout()
		sessionStorage.clear()
	}, [authClass, fortunaApiClient, personalInfoClass])

	return logout
}
