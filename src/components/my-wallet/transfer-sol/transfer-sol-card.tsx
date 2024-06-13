import _ from "lodash"
import { observer } from "mobx-react"
import ReviewTransferInfo from "./review/review-transfer-info"
import InitialTransferInfo from "./initial/initial-transfer-info"
import { useSolanaContext } from "../../../contexts/solana-context"

function TransferSolCard() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass) || solanaClass.isTransferSolButtonPressed === false) return null

	return (
		<div
			className="rounded-lg p-4 m-2 grid grid-cols-1 gap-4 absolute z-10 w-72 \
				text-zinc-950 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
			style={{ top: "20%", left: "50%", transform: "translate(-50%, -20%)" }}
		>
			{solanaClass.transferSolDetails.transferStage === "initial" && <InitialTransferInfo />}
			{solanaClass.transferSolDetails.transferStage === "review" && <ReviewTransferInfo />}
		</div>
	)
}

export default observer(TransferSolCard)
