import _ from "lodash"
import { useObserver } from "mobx-react"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useMyTransactionsToShow(): SingleTransaction[] {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	return useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return []

		let filteredTransactions = positionsAndTransactionsClass.mySolanaTransactions

		// Filter by title
		if (!_.isEmpty(positionsAndTransactionsClass.walletFilter.transactionTitleIncludes)) {
			const lowercaseTitle = positionsAndTransactionsClass.walletFilter.transactionTitleIncludes.toLowerCase()
			filteredTransactions = filteredTransactions.filter(transaction =>
				(transaction.transferFromUsername.toLowerCase().includes(lowercaseTitle) ||
                (transaction.transferToUsername && transaction.transferToUsername.toLowerCase().includes(lowercaseTitle)) ||
				(transaction.transferToPublicKey && transaction.transferToPublicKey.toLowerCase().includes(lowercaseTitle)))
			)
		}

		// Filter by transaction type:
		filteredTransactions = filteredTransactions.filter(transaction =>
			positionsAndTransactionsClass.walletFilter.transactionType.includes(
				transaction.depositOrWithdrawal === "deposit" ? "Deposits" : "Withdrawals"
			)
		)

		filteredTransactions = filteredTransactions.slice().sort((a, b) =>
			positionsAndTransactionsClass.walletFilter.orderDateBy === "asc"
				? new Date(a.transferDateTime).getTime() - new Date(b.transferDateTime).getTime()
				: new Date(b.transferDateTime).getTime() - new Date(a.transferDateTime).getTime()
		)

		return _.uniqBy(filteredTransactions, "solTransferId")
	})
}
