import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/exchange/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const exchangeClass = useExchangeContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const numberOfTokensPurchasing = useMemo(() => {
		if (_.isNull(exchangeClass)) return 0
		return exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.purchasePrimarySplSharesDetails.numberOfTokensPurchasing])

	const updatePurchasePrimarySplSharesDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(exchangeClass)) return
		return exchangeClass.updatePurchasePrimarySplSharesDetails("numberOfTokensPurchasing", parseInt(e.target.value, 10))
	}, [exchangeClass])

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
