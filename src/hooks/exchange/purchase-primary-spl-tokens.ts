import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useRetrieveWalletBalance from "../solana/wallet-balance/retrieve-wallet-balance"

export default function usePurchasePrimarySplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	videoUUID: string
) => Promise<void> {
	const videoClass = useVideoContext()
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const purchasePrimarySplTokens = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
		videoUUID: string
	): Promise<void> => {
		try {
			if (_.isNull(exchangeClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)
			const purchaseSplTokensData: PurchaseSplTokensData = {
				numberOfTokensPurchasing: exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing,
				splPublicKey: exchangeClass.purchasePrimarySplSharesDetails.splPublicKey
			}
			const purchaseResponse = await fortunaApiClient.exchangeDataService.primarySplTokenPurchase(purchaseSplTokensData)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing primary SPL purchase")
			}
			exchangeClass.addOwnership(purchaseResponse.data)
			videoClass.tokenPurchaseUpdateAvailableShares(videoUUID, purchaseSplTokensData.numberOfTokensPurchasing)
			exchangeClass.resetPurchaseSplSharesDetails()
			await retrieveWalletBalance()
			// FUTURE TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseSplTokens response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken, retrieveWalletBalance, videoClass])

	return purchasePrimarySplTokens
}
