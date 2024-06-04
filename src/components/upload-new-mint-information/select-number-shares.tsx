import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../range-selector-slider"
import { useSolanaContext } from "../../contexts/solana-context"
import useIsNewSplLoading from "../../hooks/solana/mint-spl/is-new-spl-leading"

function SelectNumberShares() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const numberOfShares = useMemo(() => {
		if (_.isNull(solanaClass)) return 0
		return solanaClass.newSplDetails.numberOfShares
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.numberOfShares])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("numberOfShares", parseInt(event.target.value, 10))
	}, [solanaClass])

	return (
		<div className="flex flex-col space-y-4 text-zinc-950 dark:text-white">
			<RangeSelectorSlider
				title="Number of Shares"
				value={numberOfShares}
				onChange={updateNewSplDetails}
				min={100}
				max={1000}
				step={1}
				disabled={isNewSplLoading}
			/>
			{numberOfShares} Shares
		</div>
	)
}

export default observer(SelectNumberShares)
