import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferBackButton() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<Button
			title="<"
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			onClick={() => solanaClass.updateTransferSolDetails("transferStage", "initial")}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewTransferBackButton)
