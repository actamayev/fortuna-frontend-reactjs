import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useYouTubeContext } from "../../contexts/youtube-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const solanaClass = useSolanaContext()
	const youtubeClass = useYouTubeContext()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	const logout = useCallback((): void => {
		authClass.setIsLoggingOut(true)
		personalInfoClass?.logout()
		solanaClass?.logout()
		positionsAndTransactionsClass?.logout()
		videoClass.logout()
		exchangeClass?.logout()
		youtubeClass?.logout()
		authClass.logout()
		fortunaApiClient.logout()
		navigate("/")
	}, [personalInfoClass, solanaClass, positionsAndTransactionsClass, videoClass,
		exchangeClass, youtubeClass, authClass, fortunaApiClient, navigate])

	return logout
}
