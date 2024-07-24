import _ from "lodash"
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

	const setTransactionIdToFocusOn = useCallback(() => {
		if (
			_.isNull(positionsAndTransactionsClass) ||
			positionsAndTransactionsClass.transactionIdToFocusOn === solanaTransaction.solTransferId
		) return
		positionsAndTransactionsClass.updateTransactionToFocusOn(solanaTransaction.solTransferId)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.transactionIdToFocusOn, solanaTransaction.solTransferId])

	const isCurrentTransactionFocusedOn = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return false
		return positionsAndTransactionsClass.transactionIdToFocusOn === solanaTransaction.solTransferId
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.transactionIdToFocusOn, solanaTransaction.solTransferId])

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
				{abbreviatedDateFormatter(solanaTransaction.transferDateTime)}
			</div>
			<div className="col-span-2 flex items-center">
				<TransactionTypeTemplate
					depositOrWithdrawal={solanaTransaction.depositOrWithdrawal}
					iconSize={30}
					extraClasses="space-x-3"
				/>
			</div>
			<div className="col-span-1 flex items-center">
				<div
					className={`flex justify-start ${solanaTransaction.depositOrWithdrawal === "deposit" ?
						"text-green-600 dark:text-green-400" :
						"text-zinc-950 dark:text-zinc-200"}`}
				>
					{solanaTransaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
					<ShowProvidedUsdOrSolPrice
						roundOrFixed="fixed"
						solPriceToDisplay={solanaTransaction.solAmountTransferred}
						usdPriceToDisplay={solanaTransaction.usdAmountTransferred}
					/>
				</div>
			</div>
			<div className="col-span-3 flex items-center">
				<TransactionDescriptionTemplate solanaTransaction={solanaTransaction} />
			</div>
			<div className="col-span-1 flex justify-end">
				<NewWalletBalanceTemplate
					newWalletBalanceSol={solanaTransaction.newWalletBalanceSol}
					newWalletBalanceUsd={solanaTransaction.newWalletBalanceUsd}
				/>
			</div>
		</div>
	)
}

export default observer(SingleSolanaTransaction)  // Keep this an observer (the defaultCurrency is a memo)
