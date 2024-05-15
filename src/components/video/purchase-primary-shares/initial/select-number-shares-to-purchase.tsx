import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import useCalculateMaxSharesToPurchase from "../../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const exchangeClass = useExchangeContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return true
		return exchangeClass.checkIfUuidExistsInContentList(videoUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, videoUUID, exchangeClass?.myContent])

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID) || wasVideoCreatedByUser === true) return null

	return (
		<div>
			<RangeSelectorSlider
				title="Shares to purchase"
				value={exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
				onChange={(e) => exchangeClass.updatePurchaseSplSharesDetails("numberOfTokensPurchasing", Number(e.target.value))}
				min={0}
				max={calculateMaxSharesToPurchase(videoUUID)}
				step={1}
			/>
			<div>
				{exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
			</div>
		</div>
	)
}

export default observer(SelectNumberSharesToPurchase)
