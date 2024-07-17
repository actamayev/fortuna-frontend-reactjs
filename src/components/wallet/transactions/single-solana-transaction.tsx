import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"

interface Props {
	transaction: SolanaTransaction
}

function SingleSolanaTransaction(props: Props) {
	const { transaction } = props
	const defaultCurrency = useDefaultCurrency()
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()

	return (
		<div
			className="grid grid-cols-8 gap-4 bg-white dark:bg-neutral-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2.5
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer rounded-sm text-sm"
		>
			<div className="col-span-1 flex items-center">
				{abbreviatedDateFormatter(transaction.transferDateTime)}
			</div>
			<div className="col-span-2 flex items-center">
				{transaction.depositOrWithdrawal === "withdrawal" ? (
					<div className="flex flex-row items-center space-x-3">
						<BsArrowUpRightSquareFill size={30} className="flex-shrink-0"/>
						<div>Withdrawal</div>
					</div>
				) : (
					<div className="flex flex-row items-center space-x-3">
						<BsArrowDownLeftSquareFill size={30} className="flex-shrink-0"/>
						<div>Deposit</div>
					</div>
				)}
			</div>
			<div className="col-span-1 flex items-center">
				<div
					className={`flex justify-start ${transaction.depositOrWithdrawal === "deposit" ? "text-green-600 dark:text-green-400" :
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
			<div className="col-span-4 flex items-center">
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

export default observer(SingleSolanaTransaction)  // Keep this an observer (the defaultCurrency is a memo)
