import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRequestAirdrop(): (
	setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const requestAirdop = useCallback(async (
		setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (_.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsButtonDisabled(true)
			const airdropResponse = await fortunaApiClient.solanaDataService.requestAirdrop()
			if (
				!_.isEqual(airdropResponse.status, 200) ||
				isMessageResponse(airdropResponse.data) ||
				isErrorResponse(airdropResponse.data)
			) {
				return
			}

			solanaClass.walletBalanceSol = airdropResponse.data.balanceInSol
			solanaClass.setSolPriceDetails({
				solPriceInUSD: airdropResponse.data.solPriceInUSD,
				lastRetrievedTime: airdropResponse.data.solPriceRetrievedTime
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsButtonDisabled(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, solanaClass])

	return requestAirdop
}
