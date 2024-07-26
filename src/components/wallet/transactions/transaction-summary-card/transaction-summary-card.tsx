import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { isSolanaTransaction } from "../../../../utils/type-checks"
import TransactionSummaryHeader from "./header/transaction-summary-header"
import ShowExclusiveContentAccessDetailsSummaryCard
	from "./exclusive-video-content-access/show-exclusive-content-access-details-summary-card"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"
import ShowSolanaTransactionDetailsSummaryCard from "./solana-transaction/show-solana-transaction-details-summary-card"

function TransactionSummaryCard() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const transaction = useMemo(() => {
		const newTransactionIdToFocusOn = positionsAndTransactionsClass.transactionIdToFocusOn
		if (_.isNull(newTransactionIdToFocusOn)) return null
		if (_.isNumber(newTransactionIdToFocusOn)) {
			return positionsAndTransactionsClass.contextForMyTransaction(newTransactionIdToFocusOn)
		} else {
			return positionsAndTransactionsClass.contextForMyPurchasesExclusiveContent(newTransactionIdToFocusOn)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass.transactionIdToFocusOn])

	if (_.isNil(transaction)) return null

	return (
		<div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-200 p-2 rounded">
			<TransactionSummaryHeader transaction={transaction}/>
			<div className="border-b border-zinc-300 dark:border-zinc-700 my-1"></div>
			{isSolanaTransaction(transaction) ? (
				<ShowSolanaTransactionDetailsSummaryCard solanaTransaction={transaction} />
			) : (
				<ShowExclusiveContentAccessDetailsSummaryCard exclusiveContentPurchase={transaction} />
			)}
		</div>
	)
}

export default observer(TransactionSummaryCard)
