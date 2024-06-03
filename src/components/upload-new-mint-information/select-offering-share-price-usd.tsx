import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"
import useIsNewSplLoading from "../../hooks/solana/mint-spl/is-new-spl-leading"

function SelectOfferingSharePriceUsd() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const listingSharePriceUsd = useMemo(() => {
		if (_.isNull(solanaClass)) return 0
		return solanaClass.newSplDetails.listingSharePriceUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.listingSharePriceUsd])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("listingSharePriceUsd", Number(event.target.value))
	}, [solanaClass])

	return (
		<div className="flex flex-col space-y-4 text-zinc-900 dark:text-white">
			<RangeSelectorSlider
				title="Offering price per share ($)"
				value={listingSharePriceUsd}
				onChange={updateNewSplDetails}
				min={0.5}
				max={50}
				step={0.05}
				disabled={isNewSplLoading}
			/>
			${_.round(listingSharePriceUsd, 2)}/Share
		</div>
	)
}

export default observer(SelectOfferingSharePriceUsd)
