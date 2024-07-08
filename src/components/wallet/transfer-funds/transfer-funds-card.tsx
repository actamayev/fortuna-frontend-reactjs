import _ from "lodash"
import { observer } from "mobx-react"
import ReviewTransferInfo from "./review/review-transfer-info"
import InitialTransferInfo from "./initial/initial-transfer-info"
import { useSolanaContext } from "../../../contexts/solana-context"

function TransferFundsCard() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass) || solanaClass.isTransferFundsButtonPressed === false) return null

	return (
		<div
			className="rounded-lg p-4 m-2 grid grid-cols-1 gap-4 fixed top-20 left-1/2 transform -translate-x-1/2 \
		text-zinc-950 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
			style={{ maxHeight: "calc(100vh - 40px)", overflowY: "auto", width: "350px" }}
		>
			{solanaClass.transferFundsDetails.transferStage === "initial" && <InitialTransferInfo />}
			{solanaClass.transferFundsDetails.transferStage === "review" && <ReviewTransferInfo />}
		</div>
	)
}

export default observer(TransferFundsCard)
