import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectNumberShares() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="mb-4">
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title="Number of Shares"
					value={solanaClass.newSplDetails.numberOfShares}
					onChange={(event) => solanaClass.updateNewSplDetails("numberOfShares", parseInt(event.target.value, 10))}
					min={100}
					max={1000}
					step={1}
					disabled={solanaClass.isNewSplLoading}
				/>
				{solanaClass.newSplDetails.numberOfShares} Shares
			</div>
		</div>
	)
}

export default observer(SelectNumberShares)
