import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Slider from "../../slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useIsNewSplLoading from "../../../hooks/solana/mint-spl/is-new-spl-leading"

function IsContentExclusiveSlider() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const isContentExclusive = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.newSplDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.isContentExclusive])

	const updateNewSplDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails("isContentExclusive", !solanaClass.newSplDetails.isContentExclusive)
	}, [solanaClass])

	return (
		<div className="flex flex-row items-center space-x-2">
			<span>Exclusive Content</span>
			<Slider
				checkedCondition={isContentExclusive === true}
				onChangeCheckedCondition={updateNewSplDetails}
				disabledCondition={isNewSplLoading}
				colorChangeOnToggle={true}
			/>
		</div>
	)
}

export default observer(IsContentExclusiveSlider)
