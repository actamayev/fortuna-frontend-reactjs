import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useMarketContext } from "../../../../contexts/market-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/market/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const marketClass = useMarketContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const numberOfTokensPurchasing = useMemo(() => {
		if (_.isNull(marketClass)) return 0
		return marketClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [marketClass, marketClass?.purchasePrimarySplSharesDetails.numberOfTokensPurchasing])

	const updatePurchasePrimarySplSharesDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(marketClass)) return
		return marketClass.updatePurchasePrimarySplSharesDetails("numberOfTokensPurchasing", parseInt(e.target.value, 10))
	}, [marketClass])

	return (
		<div>
			<RangeSelectorSlider
				title="Shares to purchase"
				value={numberOfTokensPurchasing}
				onChange={updatePurchasePrimarySplSharesDetails}
				min={0}
				max={calculateMaxSharesToPurchase(videoUUID)}
				step={1}
			/>
			<div>{numberOfTokensPurchasing}</div>
		</div>
	)
}

export default observer(SelectNumberSharesToPurchase)
