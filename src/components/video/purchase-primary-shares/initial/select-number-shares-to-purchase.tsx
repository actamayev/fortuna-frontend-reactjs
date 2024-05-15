import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const exchangeClass = useExchangeContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null

	return (
		<div>
			<RangeSelectorSlider
				title="Shares to purchase"
				value={exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing}
				onChange={(e) => {
					exchangeClass.updatePurchasePrimarySplSharesDetails("numberOfTokensPurchasing", parseInt(e.target.value, 10))
				}}
				min={0}
				max={calculateMaxSharesToPurchase(videoUUID)}
				step={1}
			/>
			<div>
				{exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing}
			</div>
		</div>
	)
}

export default observer(SelectNumberSharesToPurchase)
