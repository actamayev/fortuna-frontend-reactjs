import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveSolPrice (): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const retrieveSolPrice = useCallback(async () => {
		try {
			if (_.isNull(solanaClass)) return
			const solPriceDetails = await fortunaApiClient.solanaDataService.retrieveSolPrice()
			if (!_.isEqual(solPriceDetails.status, 200) || isErrorResponse(solPriceDetails.data)) {
				throw Error("Unable to retrieve sol price details")
			}
			solanaClass.setSolPriceDetails(solPriceDetails.data)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.solanaDataService, solanaClass])

	return retrieveSolPrice
}
