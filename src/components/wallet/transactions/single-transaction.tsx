import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { useActualDateFormatter } from "../../../hooks/date-formatter"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"

interface Props {
	transaction: SolanaTransaction
}

function SingleTransaction(props: Props) {
	const { transaction } = props
	const defaultCurrency = useDefaultCurrency()
	const actualDateFormatter = useActualDateFormatter()

	return (
		<div
			className="grid grid-cols-7 gap-4 bg-white dark:bg-neutral-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer rounded-sm"
		>
			<div className="col-span-1">
				{actualDateFormatter(transaction.transferDateTime)}
			</div>
			<div className="col-span-1">
				{transaction.depositOrWithdrawal === "withdrawal" ? (
					<div className="flex flex-row items-center space-x-2">
						<BsArrowUpRightSquareFill size={25}/>
						<div>Withdrawal</div>
					</div>
				) : (
					<div className="flex flex-row items-center space-x-2">
						<BsArrowDownLeftSquareFill size={25}/>
						<div>Deposit</div>
					</div>
				)}
			</div>
			<div className="col-span-1">
				<div
					className={`flex justify-end ${transaction.depositOrWithdrawal === "deposit" ? "text-green-600 dark:text-green-400" :
						"text-red-600 dark:text-red-400"}`}
				>
					{transaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
					{(defaultCurrency === "usd") ? (
						<>${numberWithCommasFixed(transaction.usdAmountTransferred, 2)}</>
					) : (
						<>{numberWithCommasFixed(transaction.solAmountTransferred, 4)} SOL</>
					)}
				</div>
			</div>
			<div className="col-span-4">
				<span>
					Instant transfer&nbsp;
					{transaction.depositOrWithdrawal === "deposit" && (<>from @{transaction.transferFromUsername}</>)}
					{transaction.depositOrWithdrawal === "withdrawal" && (
						<>
							to {transaction.transferToUsername && <>@</>}
							{transaction.transferToUsername || transaction.transferToPublicKey}
						</>
					)}
				</span>
			</div>
		</div>
	)
}

export default observer(SingleTransaction)  // Keep this an observer (the defaultCurrency is a memo)
