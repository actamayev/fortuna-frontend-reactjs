import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectNumberShares() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// TODO: Change this to be a slider from 100 - 1000 shares
	return (
		<FormGroup
			label = "Number of Shares"
			type = "number"
			placeholder = "1000"
			onChange = {(event) => solanaClass.updateNewSplDetails("numberOfShares", Number(event.target.value))}
			required
			value = {solanaClass.newSplDetails.numberOfShares.toString()}
		/>
	)
}

export default observer(SelectNumberShares)
