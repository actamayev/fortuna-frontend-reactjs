import _ from "lodash"
import { observer } from "mobx-react"
import ReviewTransferInfo from "./review-transfer-info"
import InitialTransferInfo from "./initial/initial-transfer-info"
import { useSolanaContext } from "../../../contexts/solana-context"

function TransferSolCard() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div
			className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 gap-4 border absolute z-10"
			style={{ top: "20%", left: "50%", transform: "translate(-50%, -20%)" }}
		>
			{solanaClass.transferSolDetails.transferStage === "initial" && <InitialTransferInfo />}
			{solanaClass.transferSolDetails.transferStage === "review" && <ReviewTransferInfo />}
		</div>
	)
}

export default observer(TransferSolCard)
