import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveWalletBalance(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const retrieveWalletBalance = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				solanaClass.isRetrievingWalletDetails === true ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return

			solanaClass.setIsRetrievingWalletDetails(true)
			const myWalletResponse = await fortunaApiClient.solanaDataService.retrieveWalletBalance()
			if (
				!_.isEqual(myWalletResponse.status, 200) ||
				isMessageResponse(myWalletResponse.data) ||
				isErrorResponse(myWalletResponse.data)
			) {
				return
			}

			solanaClass.walletBalanceSol = myWalletResponse.data.balanceInSol
			solanaClass.setSolPriceDetails({
				solPriceInUSD: myWalletResponse.data.solPriceInUSD,
				lastRetrieved: myWalletResponse.data.solPriceRetrievedTime
			})
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingWalletDetails(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, solanaClass])

	return retrieveWalletBalance
}
