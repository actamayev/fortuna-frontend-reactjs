import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()
	const navigate = useNavigate()

	const logout = useCallback((): void => {
		personalInfoClass?.logout()
		authClass.logout()
		fortunaApiClient.logout()
		localStorage.clear()
		navigate("/")
	}, [authClass, fortunaApiClient, navigate, personalInfoClass])

	return logout
}
