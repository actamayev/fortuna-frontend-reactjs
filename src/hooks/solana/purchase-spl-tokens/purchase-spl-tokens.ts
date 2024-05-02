import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"
import useRetrieveWalletBalance from "../wallet-balance/retrieve-wallet-balance"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function usePurchaseSplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	videoUUID: string
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const purchaseSplTokens = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
		videoUUID: string
	): Promise<void> => {
		try {
			if (_.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)
			const purchaseSplTokensData: PurchaseSplTokensData = {
				numberOfTokensPurchasing: solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing,
				splPublicKey: solanaClass.purchaseSplSharesDetails.splPublicKey
			}
			const purchaseResponse = await fortunaApiClient.solanaDataService.purchaseSplTokens(purchaseSplTokensData)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error purchasing sol")
			}
			solanaClass.addOwnership(purchaseResponse.data)
			videoClass.tokenPurchaseUpdateAvailableShares(videoUUID, purchaseSplTokensData.numberOfTokensPurchasing)
			solanaClass.resetPurchaseSplSharesDetails()
			await retrieveWalletBalance()
			// TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseSplTokens response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, retrieveWalletBalance, solanaClass, videoClass])

	return purchaseSplTokens
}
