import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	transaction: SolanaTransaction
}

function SingleTransaction(props: Props) {
	const { transaction } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	const formattedDateTime = useMemo(() => {
		const lastRetrieved = transaction.transferDateTime
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
	}, [transaction.transferDateTime])

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<div className="card-container dark:text-white">
			<div>
				{_.upperFirst(transaction.outgoingOrIncoming)} Transfer on {formattedDateTime}
			</div>
			{personalInfoClass.getDefaultCurrency() === "usd" && (<> ${_.round(transaction.usdAmountTransferred, 2)}</>)}
			{personalInfoClass.getDefaultCurrency() === "sol" && (<> {_.round(transaction.solAmountTransferred, 4)}</>)}
			{personalInfoClass.getDefaultCurrency() === "sol" && (<> SOL</>)}
			{transaction.outgoingOrIncoming === "incoming" && (<> from {transaction.transferFromUsername}</>)}
			{transaction.outgoingOrIncoming === "outgoing" &&
				(<> to {transaction.transferToUsername || transaction.transferToPublicKey}</>)
			}
		</div>
	)
}

export default observer(SingleTransaction)
