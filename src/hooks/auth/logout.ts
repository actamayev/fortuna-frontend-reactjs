import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fiftyone-api-client-context"
import { useCallback } from "react"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const eventfullApiClient = useApiClientContext()

	const logout = useCallback((): void => {
		personalInfoClass?.logout()
		authClass.logout()
		eventfullApiClient.logout()
		sessionStorage.clear()
	}, [authClass, eventfullApiClient, personalInfoClass])

	return logout
}
