import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import RangeSelectorSlider from "../../range-selector-slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useCalculateMaxSharesToPurchase from "../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const solanaClass = useSolanaContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return true
		return solanaClass.checkIfUuidExistsInContentList(videoUUID)
	}, [solanaClass, videoUUID])

	if (_.isNull(solanaClass) || _.isUndefined(videoUUID) || wasVideoCreatedByUser === true) return null

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Shares to purchase"
				value={solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
				onChange={(e) => solanaClass.updatePurchaseSplSharesDetails("numberOfTokensPurchasing", Number(e.target.value))}
				min={0}
				max={calculateMaxSharesToPurchase(videoUUID)}
				step={1}
			/>
			<div>
				{solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
			</div>
		</div>
	)
}

export default observer(SelectNumberSharesToPurchase)
