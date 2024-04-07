import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	transactionId: number
}

function SingleTransaction(props: Props) {
	const { transactionId } = props
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	const pastTransaction = solanaClass.contextForMyTransaction(transactionId)

	if (_.isUndefined(pastTransaction)) return null

	return (
		<div
			className="card-container"
		>
			{pastTransaction.solTransferId}
		</div>
	)
}

export default observer(SingleTransaction)
