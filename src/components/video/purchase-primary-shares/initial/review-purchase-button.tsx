import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/exchange/purchase-spl-tokens/calculate-max-shares-to-purchase"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewPurchaseButton(props: Props) {
	const { video } = props
	const exchangeClass = useExchangeContext()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass)) return false
		if (_.isEqual(exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, 0)) return false
		return exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing <= calculateMaxSharesToPurchase(video.uuid)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, video.uuid])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "review")
		exchangeClass.updatePurchasePrimarySplSharesDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, video.splPublicKey])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Purchase"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewPurchaseButton)
