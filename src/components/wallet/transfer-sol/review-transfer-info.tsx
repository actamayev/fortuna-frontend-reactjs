import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import ConfirmTransactionButton from "./review/confirm-transaction-button"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<div className="text-center font-semibold">
				Review Transaction
			</div>


			<ConfirmTransactionButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
