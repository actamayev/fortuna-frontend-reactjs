import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useMarketContext } from "../../../../contexts/market-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/market/purchase-spl-tokens/calculate-max-shares-to-purchase"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewPurchaseButton(props: Props) {
	const { video } = props
	const marketClass = useMarketContext()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(marketClass)) return false
		if (_.isEqual(marketClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, 0)) return false
		return marketClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing <= calculateMaxSharesToPurchase(video.uuid)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [marketClass, marketClass?.purchasePrimarySplSharesDetails.numberOfTokensPurchasing, video.uuid])

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "review")
		marketClass.updatePurchasePrimarySplSharesDetails("splPublicKey", video.splPublicKey)
	}, [marketClass, video.splPublicKey])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200 dark:bg-blue-600"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-700"
			title="Review Purchase"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewPurchaseButton)
