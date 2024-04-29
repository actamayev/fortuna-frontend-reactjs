import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLNameInput() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<FormGroup
			label = "Token Name"
			type = "text"
			placeholder = "Charlie bit my finger"
			onChange = {(event) => solanaClass.updateNewSplDetails("splName", event.target.value)}
			required
			value = {solanaClass.newSplDetails.splName}
		/>
	)
}

export default observer(SPLNameInput)
