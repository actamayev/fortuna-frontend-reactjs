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

	const transferSol = useCallback(async (
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
			const myOwnership: MyOwnership = {
				splPublicKey: solanaClass.purchaseSplSharesDetails.splPublicKey,
				numberOfShares: solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing
			}
			solanaClass.addOwnership(myOwnership)
			videoClass.tokenPurchaseUpdateAvailableShares(videoUUID, purchaseSplTokensData.numberOfTokensPurchasing)
			solanaClass.resetPurchaseSplSharesDetails()
			await retrieveWalletBalance()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, retrieveWalletBalance, solanaClass, videoClass])

	return transferSol
}
