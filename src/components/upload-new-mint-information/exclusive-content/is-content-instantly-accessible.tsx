import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Slider from "../../slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useIsNewSplLoading from "../../../hooks/solana/mint-spl/is-new-spl-leading"

function IsContentInstantlyAccessible() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const isContentInstantlyAccessible = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.newSplDetails.isContentInstantlyAccessible
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.isContentInstantlyAccessible])

	const updateNewSplDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails(
			"isContentInstantlyAccessible",
			!solanaClass.newSplDetails.isContentInstantlyAccessible
		)
	}, [solanaClass])

	if (_.isNull(solanaClass) || solanaClass.newSplDetails.isContentExclusive === false) return null

	return (
		<>
			Allow fans to to instantly access this video for a fixed amount
			<div>
				<Slider
					checkedCondition={isContentInstantlyAccessible === true}
					onChangeCheckedCondition={updateNewSplDetails}
					disabledCondition={isNewSplLoading}
					colorChangeOnToggle={true}
				/>
			</div>
		</>
	)
}

export default observer(IsContentInstantlyAccessible)
