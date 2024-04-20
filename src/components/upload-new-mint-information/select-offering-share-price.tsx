import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import { useSolanaContext } from "../../contexts/solana-context"

function SelectOfferingSharePrice() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// FUTURE TODO: Make an option to enter in dollars (maybe have two boxes, each of which influences the other when changed)
	// TODO: Change this to limit between $0.5 and $50/share.
	return (
		<FormGroup
			label = "Offering price per share (Sol)"
			type = "number"
			placeholder = "1"
			onChange = {(event) => solanaClass.updateNewSplDetails("offeringSharePriceSol", Number(event.target.value))}
			required
			value = {solanaClass.newSplDetails.offeringSharePriceSol.toString()}
		/>
	)
}

export default observer(SelectOfferingSharePrice)
