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
				value={solanaClass.newSplDetails.offeringSharePriceSol}
				onChange={(event) => solanaClass.updateNewSplDetails("offeringSharePriceSol", Number(event.target.value))}
				min={0.003}
				max={0.3}
				step={0.003}
			/>
			{solanaClass.newSplDetails.offeringSharePriceSol} Sol/Share
		</div>
	)
}

export default observer(SelectOfferingSharePriceSol)
