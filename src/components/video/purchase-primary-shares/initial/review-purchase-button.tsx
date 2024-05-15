import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import { useAuthContext } from "../../../../contexts/auth-context"
import { useVideoContext } from "../../../../contexts/video-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function ReviewPurchaseButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const videoClass = useVideoContext()
	const authClass = useAuthContext()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return true
		return exchangeClass.checkIfUuidExistsInContentList(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, videoUUID, exchangeClass?.myContent])

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return false
		return exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing <= calculateMaxSharesToPurchase(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass?.purchaseSplSharesDetails.numberOfTokensPurchasing, videoUUID])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video)) return
		exchangeClass.updatePurchaseSplSharesDetails("purchaseStage", "review")
		exchangeClass.updatePurchaseSplSharesDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, videoClass, videoUUID])

	const createTitleForButton = useMemo(() => {
		if (_.isNull(authClass.accessToken)) return "Please Create an Account to purchase shares"
		if (wasVideoCreatedByUser === true) return "Unable to purchase own shares"
		else if (isAbleToPurchaseShares === false) return "Unable to purchase shares"
		return "Review Purchase"
	}, [authClass.accessToken, isAbleToPurchaseShares, wasVideoCreatedByUser])

	if (_.isNull(exchangeClass)) return null

	return (
		<div className="flex justify-center">
			<Button
				onClick={onClickButton}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title={createTitleForButton}
				disabled={wasVideoCreatedByUser || !isAbleToPurchaseShares ||
					exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing === 0
				}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ReviewPurchaseButton)
