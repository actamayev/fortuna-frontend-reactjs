import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useYoutTubeContext } from "../../contexts/youtube-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const youTubeClass = useYoutTubeContext()
	const navigate = useTypedNavigate()

	const logout = useCallback((): void => {
		personalInfoClass?.logout()
		solanaClass?.logout()
		youTubeClass?.logout()
		authClass.logout()
		fortunaApiClient.logout()
		navigate("/")
	}, [authClass, fortunaApiClient, navigate, personalInfoClass, solanaClass, youTubeClass])

	return logout
}
