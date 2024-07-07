import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import useDefaultCurrency from "../../../hooks/memos/default-currency"

interface Props {
	transaction: SolanaTransaction
}

function SingleTransaction(props: Props) {
	const { transaction } = props
	const defaultCurrency = useDefaultCurrency()

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
			className="bg-zinc-100 dark:bg-zinc-800 mt-2 p-2 rounded-sm \
				text-zinc-950 dark:text-zinc-200 flex items-center"
		>
			<div className="mr-2">
				{transaction.outgoingOrIncoming === "outgoing" ? (
					<BsArrowUpRightSquareFill size={50}/>
				) : (
					<BsArrowDownLeftSquareFill size={50}/>
				)}
			</div>
			<div>
				<div className="flex items-center">
					<div
						className={`${transaction.outgoingOrIncoming === "incoming" ? "text-green-600 dark:text-green-400" :
							"text-red-600 dark:text-red-400"}`}
					>
						{transaction.outgoingOrIncoming === "incoming" ? (<>+</>) : (<>-</>)}
						{(defaultCurrency === "usd") ? (
							<>${(transaction.usdAmountTransferred).toFixed(2)}</>
						) : (
							<>{(transaction.solAmountTransferred).toFixed(4)} SOL</>
						)}
					</div>
					<span>&nbsp;
						{transaction.outgoingOrIncoming === "incoming" && (<>from {transaction.transferFromUsername}</>)}
						{transaction.outgoingOrIncoming === "outgoing" && (
							<>to {transaction.transferToUsername || transaction.transferToPublicKey}</>
						)}
					</span>
				</div>

				<div>
					{formattedDateTime}
				</div>
			</div>
		</div>
	)
}

export default observer(SingleTransaction)  // Keep this an observer (the defaultCurrency is a memo)
