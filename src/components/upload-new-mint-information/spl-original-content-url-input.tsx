import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLOriginalContentUrlInput() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<FormGroup
			label = "Original Content URL (optional)"
			type = "text"
			placeholder = "https://www.youtube.com/watch?v=_OBlgSz8sSM"
			onChange = {(event) => solanaClass.updateNewSplDetails("originalContentUrl", event.target.value)}
			value = {solanaClass.newSplDetails.originalContentUrl}
		/>
	)
}

export default observer(SPLOriginalContentUrlInput)
