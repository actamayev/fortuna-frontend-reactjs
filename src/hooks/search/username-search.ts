import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUsernameSearch(): (
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	setUsernameSearchResults: React.Dispatch<React.SetStateAction<{ username: string }[]>>
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback(async (
		setIsLoading: (value: React.SetStateAction<boolean>) => void,
		setUsernameSearchResults: React.Dispatch<React.SetStateAction<{ username: string }[]>>
	) => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isEmpty(solanaClass.moneyTransferDetails.username.trim()) ||
				solanaClass.moneyTransferDetails.isUsernameSelected === true
			) {
				setUsernameSearchResults([])
				return
			}
			setIsLoading(true)

			const response = await fortunaApiClient.searchDataService.searchForUsername(solanaClass.moneyTransferDetails.username)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				throw new Error("User Search Failed")
			}
			setUsernameSearchResults(response.data.usernames)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fortunaApiClient.searchDataService, solanaClass?.moneyTransferDetails.isUsernameSelected,
		solanaClass?.moneyTransferDetails.username])
}
