import _ from "lodash"
import { useObserver } from "mobx-react"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useMyTransactionsToShow(): SolanaTransaction[] {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	return useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return []

		let filteredTransactions = positionsAndTransactionsClass.mySolanaTransactions

		// Filter by title
		if (!_.isEmpty(positionsAndTransactionsClass.walletFilter.transactionTitleIncludes)) {
			const titleIncludes = positionsAndTransactionsClass.walletFilter.transactionTitleIncludes.toLowerCase()
			filteredTransactions = filteredTransactions.filter(transaction =>
				(transaction.transferFromUsername.toLowerCase().includes(titleIncludes) ||
                (transaction.transferToUsername && transaction.transferToUsername.toLowerCase().includes(titleIncludes)))
			)
		}

		// Filter by transaction type:
		if (!_.isEmpty(positionsAndTransactionsClass.walletFilter.transactionType.length)) {
			filteredTransactions = filteredTransactions.filter(transaction =>
				positionsAndTransactionsClass.walletFilter.transactionType.includes(
					transaction.depositOrWithdrawal === "deposit" ? "Deposits" : "Withdrawals"
				)
			)
		}

		filteredTransactions = filteredTransactions.slice().sort((a, b) =>
			positionsAndTransactionsClass.walletFilter.orderDateBy === "asc"
				? new Date(a.transferDateTime).getTime() - new Date(b.transferDateTime).getTime()
				: new Date(b.transferDateTime).getTime() - new Date(a.transferDateTime).getTime()
		)

		return _.uniqBy(filteredTransactions, "solTransferId")
	})
}
