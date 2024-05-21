import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	transaction: SolanaTransaction
}

function SingleTransaction(props: Props) {
	const { transaction } = props
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

	return (
		<div className="bg-white border shadow-sm mt-2 p-2 rounded-sm">
			<div>
				{_.upperFirst(transaction.outgoingOrIncoming)} Transfer on {formattedDateTime}
			</div>
			<div>
				{(_.isNull(personalInfoClass) || personalInfoClass.defaultCurrency === "usd") ? (
					<> ${(transaction.usdAmountTransferred).toFixed(2)}</>
				) : (
					<> {(transaction.solAmountTransferred).toFixed(4)} SOL</>
				)}
				{transaction.outgoingOrIncoming === "incoming" && (<> from {transaction.transferFromUsername}</>)}
				{transaction.outgoingOrIncoming === "outgoing" &&
					(<> to {transaction.transferToUsername || transaction.transferToPublicKey}</>)
				}
			</div>
		</div>
	)
}

export default observer(SingleTransaction)
