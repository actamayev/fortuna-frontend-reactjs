import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../range-selector-slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useIsNewSplLoading from "../../../hooks/solana/mint-spl/is-new-spl-leading"

function ValueNeededToAccessExclusiveContent() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const valueNeededToAccessExclusiveContent = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(solanaClass.newSplDetails.valueNeededToAccessExclusiveContentUsd)) return 0
		return solanaClass.newSplDetails.valueNeededToAccessExclusiveContentUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.valueNeededToAccessExclusiveContentUsd])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("valueNeededToAccessExclusiveContentUsd", Number(event.target.value))
	}, [solanaClass])

	const minNumberSharesToAccessExclusiveContent = useMemo(() => {
		if (!solanaClass || !solanaClass.newSplDetails.valueNeededToAccessExclusiveContentUsd) return 0

		const valueNeeded = solanaClass.newSplDetails.valueNeededToAccessExclusiveContentUsd
		const listingSharePrice = solanaClass.newSplDetails.listingSharePriceUsd

		return Math.ceil(valueNeeded / listingSharePrice)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.valueNeededToAccessExclusiveContentUsd, solanaClass?.newSplDetails.listingSharePriceUsd])

	if (_.isNull(solanaClass) || solanaClass.newSplDetails.isContentExclusive === false) return null

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Token Value needed to access ($)"
				value={valueNeededToAccessExclusiveContent}
				onChange={updateNewSplDetails}
				min={50}
				max={90}
				step={1}
				disabled={isNewSplLoading}
			/>
			${valueNeededToAccessExclusiveContent} ({minNumberSharesToAccessExclusiveContent} shares)
		</div>
	)
}

export default observer(ValueNeededToAccessExclusiveContent)
