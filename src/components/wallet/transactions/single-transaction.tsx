import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"

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
				{transaction.depositOrWithdrawal === "withdrawal" ? (
					<BsArrowUpRightSquareFill size={50}/>
				) : (
					<BsArrowDownLeftSquareFill size={50}/>
				)}
			</div>
			<div>
				<div className="flex items-center">
					<div
						className={`${transaction.depositOrWithdrawal === "deposit" ? "text-green-600 dark:text-green-400" :
							"text-red-600 dark:text-red-400"}`}
					>
						{transaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
						{(defaultCurrency === "usd") ? (
							<>${numberWithCommasFixed(transaction.usdAmountTransferred, 2)}</>
						) : (
							<>{numberWithCommasFixed(transaction.solAmountTransferred, 4)} SOL</>
						)}
					</div>
					<span>&nbsp;
						{transaction.depositOrWithdrawal === "deposit" && (<>from @{transaction.transferFromUsername}</>)}
						{transaction.depositOrWithdrawal === "withdrawal" && (
							<>
								to {transaction.transferToUsername && <>@</>}
								{transaction.transferToUsername || transaction.transferToPublicKey}
							</>
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
