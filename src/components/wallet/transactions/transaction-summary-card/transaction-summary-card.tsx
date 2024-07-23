import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { isSolanaTransaction } from "../../../../utils/type-checks"
import ShowSolanaTransactionDetailsSummaryCard from "./show-solana-transaction-details-summary-card"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"
import ShowExclusiveContentAccessDetailsSummaryCard from "./show-exclusive-content-access-details-summary-card"

interface Props {
	myTransactionsToShow: SingleTransaction[]
}

function TransactionSummaryCard(props: Props) {
	const { myTransactionsToShow } = props // use this to move left/right in myTransactionsToShow
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const transaction = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return null
		const newTransactionIdToFocusOn = positionsAndTransactionsClass.transactionIdToFocusOn
		if (_.isNull(newTransactionIdToFocusOn)) return null
		if (_.isNumber(newTransactionIdToFocusOn)) {
			return positionsAndTransactionsClass.contextForMyTransaction(newTransactionIdToFocusOn)
		} else {
			return positionsAndTransactionsClass.contextForMyPurchasesExclusiveContent(newTransactionIdToFocusOn)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.transactionIdToFocusOn])

	if (_.isNil(transaction)) return null

	return (
		<div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-200">
			<div>Transaction Summary</div>
			{isSolanaTransaction(transaction) ? (
				<ShowSolanaTransactionDetailsSummaryCard solanaTransaction={transaction} />
			) : (
				<ShowExclusiveContentAccessDetailsSummaryCard exclusiveContentPurchase={transaction} />
			)}
		</div>
	)
}

export default observer(TransactionSummaryCard)
