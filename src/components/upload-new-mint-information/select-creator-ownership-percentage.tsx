import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"
import useIsNewSplLoading from "../../hooks/solana/mint-spl/is-new-spl-leading"

function SelectCreatorOwnershipPercentage() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const creatorOwnershipPercentage = useMemo(() => {
		if (_.isNull(solanaClass)) return 0
		return solanaClass.newSplDetails.creatorOwnershipPercentage
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.creatorOwnershipPercentage])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("creatorOwnershipPercentage", parseInt(event.target.value))
	}, [solanaClass])

	return (
		<div className="flex flex-col space-y-4 text-zinc-900 dark:text-white">
			<RangeSelectorSlider
				title="Retained Ownership Percentage"
				value={creatorOwnershipPercentage}
				onChange={updateNewSplDetails}
				min={50}
				max={90}
				step={1}
				disabled={isNewSplLoading}
			/>
			{creatorOwnershipPercentage}%
		</div>
	)
}

export default observer(SelectCreatorOwnershipPercentage)
