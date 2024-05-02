import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectOfferingSharePriceSol() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Offering price per share (SOL)"
				value={solanaClass.newSplDetails.listingSharePrice}
				onChange={(event) => solanaClass.updateNewSplDetails("listingSharePrice", Number(event.target.value))}
				min={0.003}
				max={0.3}
				step={0.003}
			/>
			{_.round(solanaClass.newSplDetails.listingSharePrice, 4)} Sol/Share
		</div>
	)
}

export default observer(SelectOfferingSharePriceSol)
