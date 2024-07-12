import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveSolPrice (): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	return useCallback(async () => {
		if (_.isNull(solanaClass)) return
		try {
			if (solanaClass.isRetrievingSolPriceDetails === true) return
			solanaClass.setIsRetrievingSolPriceDetails(true)
			const solPriceDetails = await fortunaApiClient.solanaDataService.retrieveSolPrice()
			if (!_.isEqual(solPriceDetails.status, 200) || isErrorResponse(solPriceDetails.data)) {
				throw Error("Unable to retrieve sol price details")
			}
			solanaClass.setSolPriceDetails(solPriceDetails.data)
		} catch (error) {
			console.error(error)
		} finally {
			solanaClass.setIsRetrievingSolPriceDetails(false)
		}
	}, [solanaClass, fortunaApiClient.solanaDataService])
}
