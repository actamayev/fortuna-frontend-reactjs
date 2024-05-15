import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectOfferingSharePriceUsd() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Offering price per share ($)"
				value={solanaClass.newSplDetails.listingSharePriceUsd}
				onChange={(event) => solanaClass.updateNewSplDetails("listingSharePriceUsd", parseInt(event.target.value, 10))}
				min={0.5}
				max={50}
				step={0.01}
				disabled={solanaClass.isNewSplLoading}
			/>
			${_.round(solanaClass.newSplDetails.listingSharePriceUsd, 2)}/Share
		</div>
	)
}

export default observer(SelectOfferingSharePriceUsd)
