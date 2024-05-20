import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLOriginalContentUrlInput() {
	const solanaClass = useSolanaContext()

	const originalContentUrl = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.newSplDetails.originalContentUrl
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.newSplDetails.originalContentUrl])

	const updateNewSplDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		return solanaClass.updateNewSplDetails("originalContentUrl", event.target.value)
	}, [solanaClass])

	return (
		<FormGroup
			label = "Original Content URL (optional)"
			type = "text"
			placeholder = "https://www.youtube.com/watch?v=_OBlgSz8sSM"
			onChange = {updateNewSplDetails}
			value = {originalContentUrl}
		/>
	)
}

export default observer(SPLOriginalContentUrlInput)
