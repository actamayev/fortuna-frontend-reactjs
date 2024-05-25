import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function usePurchaseInstantAccess(): (
	videoUUID: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()

	const purchaseInstantAccess = useCallback(async (
		videoUUID: string,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (_.isNull(exchangeClass) || _.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video)) return
			setIsLoading(true)
			const purchaseResponse = await fortunaApiClient.exchangeDataService.purchaseExclusiveContentAccess(videoUUID)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing primary SPL purchase")
			}
			// TODO: Add the instant access to some data structure to hold the user's instant access
			exchangeClass.setInstantAccessToExclusiveContentStage("initial")
			if (_.isNull(video.listingPriceToAccessContentUsd)) return
			solanaClass.alterWalletBalanceUsd(-video.listingPriceToAccessContentUsd)
			// FUTURE TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseSplTokens response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, solanaClass, videoClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken])

	return purchaseInstantAccess
}
