import { useCallback } from "react"
import useTypedNavigate from "../typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const navigate = useTypedNavigate()

	const logout = useCallback((): void => {
		personalInfoClass?.logout()
		solanaClass?.logout()
		authClass.logout()
		fortunaApiClient.logout()
		localStorage.clear()
		navigate("/")
	}, [authClass, fortunaApiClient, navigate, personalInfoClass, solanaClass])

	return logout
}
