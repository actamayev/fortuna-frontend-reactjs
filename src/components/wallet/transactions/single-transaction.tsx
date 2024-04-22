import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	transactionId: number
}

function SingleTransaction(props: Props) {
	const { transactionId } = props
	const solanaClass = useSolanaContext()

	const pastTransaction = solanaClass?.contextForMyTransaction(transactionId)
	const formattedDateTime = useMemo(() => {
		const lastRetrieved = pastTransaction?.transferDateTime
		if (_.isUndefined(lastRetrieved)) return "unknown"

		const date = new Date(lastRetrieved)
		const dateString = date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		})
		const timeString = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true
		})

		return `${dateString} at ${timeString}`
	}, [pastTransaction?.transferDateTime])

	if (_.isNull(solanaClass) || _.isUndefined(pastTransaction)) return null

	return (
		<div className="card-container">
			<div>
				{_.upperFirst(pastTransaction.outgoingOrIncoming)} Transfer
			</div>
			<div>
				Transfer on {formattedDateTime}
			</div>
			Sol Transferred: {pastTransaction.solAmountTransferred} (${_.round(pastTransaction.usdAmountTransferred, 2)})
			{pastTransaction.outgoingOrIncoming === "incoming" ? <> from </> : <> to </>}
			{pastTransaction.transferToUsername || pastTransaction.transferToPublicKey}
		</div>
	)
}

export default observer(SingleTransaction)
