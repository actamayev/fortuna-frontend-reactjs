import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../range-selector-slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useIsNewSplLoading from "../../../hooks/solana/mint-spl/is-new-spl-leading"

function InstantAccessPriceToExclusiveContentUsd() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const priceToInstantlyAccessExclusiveContentUsd = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(solanaClass.newSplDetails.priceToInstantlyAccessExclusiveContentUsd)) return 0
		return solanaClass.newSplDetails.priceToInstantlyAccessExclusiveContentUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.priceToInstantlyAccessExclusiveContentUsd])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("priceToInstantlyAccessExclusiveContentUsd", Number(event.target.value))
	}, [solanaClass])

	if (
		_.isNull(solanaClass) ||
		solanaClass.newSplDetails.isContentExclusive === false ||
		solanaClass.newSplDetails.isContentInstantlyAccessible === false
	) return null

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Instant access price ($)"
				value={priceToInstantlyAccessExclusiveContentUsd}
				onChange={updateNewSplDetails}
				min={5}
				max={100}
				step={1}
				disabled={isNewSplLoading}
			/>
			${priceToInstantlyAccessExclusiveContentUsd}
		</div>
	)
}

export default observer(InstantAccessPriceToExclusiveContentUsd)
