import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectCreatorOwnershipPercentage() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<FormGroup
			label = "Ownership percentage"
			type = "number"
			placeholder = "69"
			onChange = {(event) => solanaClass.updateNewSplDetails("creatorOwnershipPercentage", Number(event.target.value))}
			required
			value = {solanaClass.newSplDetails.creatorOwnershipPercentage.toString()}
		/>
	)
}

export default observer(SelectCreatorOwnershipPercentage)
