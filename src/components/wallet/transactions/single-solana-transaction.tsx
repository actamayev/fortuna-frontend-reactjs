import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import TransactionTypeTemplate from "../transaction-type-template"
import NewWalletBalanceTemplate from "../new-wallet-balance-template"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"
import TransactionDescriptionTemplate from "../transaction-description-template"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

interface Props {
	solanaTransaction: SolanaTransaction
}

function SingleSolanaTransaction(props: Props) {
	const { solanaTransaction } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()

	const { solTransferId, transferDateTime, depositOrWithdrawal,
		solAmountTransferred, usdAmountTransferred, newWalletBalanceSol, newWalletBalanceUsd} = solanaTransaction

	const setTransactionIdToFocusOn = useCallback(() => {
		positionsAndTransactionsClass.updateTransactionToFocusOn(solTransferId)
	}, [positionsAndTransactionsClass, solTransferId])

	const isCurrentTransactionFocusedOn = useMemo(() => {
		return positionsAndTransactionsClass.transactionIdToFocusOn === solTransferId
	}, [positionsAndTransactionsClass.transactionIdToFocusOn, solTransferId])

	return (
		<div
			className={`grid grid-cols-8 gap-4 py-2.5
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer text-sm
				${isCurrentTransactionFocusedOn ?
			"bg-zinc-200 dark:bg-zinc-700" : "bg-inherit hover:bg-zinc-100 dark:hover:bg-zinc-800"}
				`}
			onClick={setTransactionIdToFocusOn}
		>
			<div className="col-span-1 flex items-center">
				{abbreviatedDateFormatter(transferDateTime)}
			</div>
			<div className="col-span-2 flex items-center">
				<TransactionTypeTemplate
					depositOrWithdrawal={depositOrWithdrawal}
					iconSize={30}
					extraClasses="space-x-3"
					showIcon={true}
				/>
			</div>
			<div className="col-span-1 flex items-center">
				<div
					className={`flex justify-start ${depositOrWithdrawal === "deposit" ?
						"text-green-600 dark:text-green-400" :
						"text-zinc-950 dark:text-zinc-200"}`}
				>
					{depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
					<ShowProvidedUsdOrSolPrice
						roundOrFixed="fixed"
						solPriceToDisplay={solAmountTransferred}
						usdPriceToDisplay={usdAmountTransferred}
					/>
				</div>
			</div>
			<div className="col-span-3 flex items-center">
				<TransactionDescriptionTemplate solanaTransaction={solanaTransaction} />
			</div>
			<div className="col-span-1 flex justify-end items-center">
				<NewWalletBalanceTemplate
					newWalletBalanceSol={newWalletBalanceSol}
					newWalletBalanceUsd={newWalletBalanceUsd}
				/>
			</div>
		</div>
	)
}

export default observer(SingleSolanaTransaction)
