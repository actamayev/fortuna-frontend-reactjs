import { observer } from "mobx-react"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"

interface Props {
	transaction: SolanaTransaction
}

function SingleSolanaTransaction(props: Props) {
	const { transaction } = props
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()

	return (
		<div
			className="grid grid-cols-8 gap-4 bg-inherit hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2.5
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer rounded-sm text-sm"
		>
			<div className="col-span-1 flex items-center">
				{abbreviatedDateFormatter(transaction.transferDateTime)}
			</div>
			<div className="col-span-2 flex items-center">
				{transaction.depositOrWithdrawal === "withdrawal" ? (
					<div className="flex flex-row items-center space-x-3">
						<BsArrowUpRightSquareFill size={30} className="flex-shrink-0 text-zinc-950 dark:text-zinc-200"/>
						<div>Withdrawal</div>
					</div>
				) : (
					<div className="flex flex-row items-center space-x-3 text-green-600 dark:text-green-400">
						<BsArrowDownLeftSquareFill size={30} className="flex-shrink-0"/>
						<div>Deposit</div>
					</div>
				)}
			</div>
			<div className="col-span-1 flex items-center">
				<div
					className={`flex justify-start ${transaction.depositOrWithdrawal === "deposit" ? "text-green-600 dark:text-green-400" :
						"text-zinc-950 dark:text-zinc-200"}`}
				>
					{transaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
					<ShowProvidedUsdOrSolPrice
						roundOrFixed="fixed"
						solPriceToDisplay={transaction.solAmountTransferred}
						usdPriceToDisplay={transaction.usdAmountTransferred}
					/>
				</div>
			</div>
			<div className="col-span-3 flex items-center">
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
			<div className="col-span-1 flex justify-end">
				{(!transaction.newWalletBalanceSol || !transaction.newWalletBalanceUsd) ? (
					<>--</>
				) : (
					<ShowProvidedUsdOrSolPrice
						solPriceToDisplay={transaction.newWalletBalanceSol}
						usdPriceToDisplay={transaction.newWalletBalanceUsd}
						roundOrFixed="fixed"
					/>
				)}
			</div>
		</div>
	)
}

export default observer(SingleSolanaTransaction)  // Keep this an observer (the defaultCurrency is a memo)
