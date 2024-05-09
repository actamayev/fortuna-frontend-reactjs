import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectCreatorOwnershipPercentage() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="mb-2">
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title="Retained Ownership Percentage"
					value={solanaClass.newSplDetails.creatorOwnershipPercentage}
					onChange={(event) => solanaClass.updateNewSplDetails("creatorOwnershipPercentage", parseInt(event.target.value))}
					min={50}
					max={90}
					step={1}
					disabled={solanaClass.isNewSplLoading}
				/>
				{solanaClass.newSplDetails.creatorOwnershipPercentage}%
			</div>
		</div>
	)
}

export default observer(SelectCreatorOwnershipPercentage)
