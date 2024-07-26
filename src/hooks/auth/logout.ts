import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useMarketContext } from "../../contexts/market-context"
import { useCreatorContext } from "../../contexts/creator-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const creatorClass = useCreatorContext()
	const marketClass = useMarketContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const personalInfoClass = usePersonalInfoContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const solanaClass = useSolanaContext()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		solanaClass.logout()
		creatorClass.logout()
		positionsAndTransactionsClass.logout()
		videoClass.logout()
		marketClass.logout()
		notificationsClass.logout()
		authClass.logout()
		fortunaApiClient.logout()
		navigate("/")
	}, [personalInfoClass, solanaClass, creatorClass, positionsAndTransactionsClass,
		videoClass, marketClass, authClass, fortunaApiClient, notificationsClass, navigate])
}
