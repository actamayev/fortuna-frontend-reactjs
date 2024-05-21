import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveWalletBalanceUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	const retrieveWalletBalance = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNil(personalInfoClass?.username) ||
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
				lastRetrievedTime: myWalletResponse.data.solPriceRetrievedTime
			})
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingWalletDetails(false)
		}
	}, [solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, personalInfoClass?.username])

	useEffect(() => {
		if (!_.isNil(solanaClass?.walletBalanceSol)) return
		void retrieveWalletBalance()
	}, [retrieveWalletBalance, solanaClass?.walletBalanceSol])
}
