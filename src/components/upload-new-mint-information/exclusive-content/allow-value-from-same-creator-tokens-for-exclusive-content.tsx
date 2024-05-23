import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Slider from "../../slider"
import { useSolanaContext } from "../../../contexts/solana-context"
import useIsNewSplLoading from "../../../hooks/solana/mint-spl/is-new-spl-leading"

function AllowValueFromSameCreatorTokensForExclusiveContent() {
	const solanaClass = useSolanaContext()
	const isNewSplLoading = useIsNewSplLoading()

	const allowValueFromSameCreatorTokensForExclusiveContent = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent])

	const updateNewSplDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateNewSplDetails(
			"allowValueFromSameCreatorTokensForExclusiveContent",
			!solanaClass.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent
		)
	}, [solanaClass])

	const whatToShow = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent === true ? "Allow" : "Do not allow"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent])

	if (_.isNull(solanaClass) || solanaClass.newSplDetails.isContentExclusive === false) return null

	return (
		<>
			Allow Value from other tokens to count for value to access this video
			<div>
				<Slider
					checkedCondition={allowValueFromSameCreatorTokensForExclusiveContent === true}
					onChangeCheckedCondition={updateNewSplDetails}
					whatToShow={whatToShow}
					disabledCondition={isNewSplLoading}
				/>
			</div>
		</>
	)

}

export default observer(AllowValueFromSameCreatorTokensForExclusiveContent)
