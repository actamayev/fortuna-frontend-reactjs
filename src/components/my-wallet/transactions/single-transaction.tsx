import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
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
		<div
			className="bg-zinc-100 dark:bg-zinc-800 shadow-sm mt-2 p-2 rounded-sm \
				text-zinc-900 dark:text-white flex items-center"
		>
			<div className="mr-2">
				{transaction.outgoingOrIncoming === "outgoing" ? (
					<BsArrowUpRightSquareFill size={50}/>
				) : (
					<BsArrowDownLeftSquareFill size={50}/>
				)}
			</div>
			<div>
				<div>
					{(_.isNull(personalInfoClass) || personalInfoClass.defaultCurrency === "usd") ? (
						<> ${(transaction.usdAmountTransferred).toFixed(2)}</>
					) : (
						<> {(transaction.solAmountTransferred).toFixed(4)} SOL</>
					)}
					{transaction.outgoingOrIncoming === "incoming" && (<> from {transaction.transferFromUsername}</>)}
					{transaction.outgoingOrIncoming === "outgoing" && (
						<> to {transaction.transferToUsername || transaction.transferToPublicKey}</>
					)}
				</div>
				<div>
					{formattedDateTime}
				</div>
			</div>
		</div>
	)
}

export default observer(SingleTransaction)
