import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import { useVideoContext } from "../../../../contexts/video-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function ReviewPurchaseButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const videoClass = useVideoContext()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return false
		if (_.isEqual(exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, 0)) return false
		return exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing <= calculateMaxSharesToPurchase(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, videoUUID])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video)) return
		exchangeClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "review")
		exchangeClass.updatePurchasePrimarySplSharesDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, videoClass, videoUUID])

	if (_.isNull(exchangeClass)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title={isAbleToPurchaseShares ? "Review Purchase" : "Unable to purchase shares"}
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewPurchaseButton)
