import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SPLDescriptionInput() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<FormGroup
			label = "Token Description"
			type = "text"
			placeholder = "Charlie bit my finger really hard"
			onChange = {(event) => solanaClass.updateNewSplDetails("description", event.target.value)}
			required
			value = {solanaClass.newSplDetails.description || ""}
			multiline={true}
		/>
	)
}

export default observer(SPLDescriptionInput)
