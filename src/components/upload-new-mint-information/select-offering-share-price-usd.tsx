import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectOfferingSharePriceUsd() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="flex flex-col space-y-4 dark:text-white">
			<RangeSelectorSlider
				title="Offering price per share ($)"
				value={solanaClass.newSplDetails.offeringSharePriceUsd}
				onChange={(event) => solanaClass.updateNewSplDetails("offeringSharePriceUsd", Number(event.target.value))}
				min={0.5}
				max={50}
				step={0.5}
			/>
			${solanaClass.newSplDetails.offeringSharePriceUsd} / Share
		</div>
	)
}

export default observer(SelectOfferingSharePriceUsd)
