import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../button"
import { useSolanaContext } from "../../../contexts/solana-context"

function SendSolButton() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass) || _.isEqual(solanaClass.transferSolDetails.amount, 0)) return null

	return (
		<Button
			onClick={() => console.log("Sending...")}
			colorClass="bg-blue-500"
			hoverClass="hover:bg-blue-600"
			title="Send"
		/>
	)
}

export default observer(SendSolButton)
