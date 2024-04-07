import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferButton() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass) || _.isEqual(solanaClass.transferSolDetails.solAmount, 0)) return null

	return (
		<Button
			onClick={() => solanaClass.updateTransferSolDetails("transferStage", "review")}
			colorClass="bg-blue-500"
			hoverClass="hover:bg-blue-600"
			title="Review Transaction"
		/>
	)
}

export default observer(ReviewTransferButton)
