import _ from "lodash"
import { useObserver } from "mobx-react"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useMyTransactionsToShow(): SingleTransaction[] {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	return useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return []

		const solanaTransactions = positionsAndTransactionsClass.mySolanaTransactions.map(transaction => ({
			...transaction,
			transactionType: transaction.depositOrWithdrawal === "deposit" ? "Deposits" : "Withdrawals",
			title: transaction.transferFromUsername
		}))

		const purchasedContentTransactions = positionsAndTransactionsClass.myPurchasedExclusiveContent.map(content => ({
			...content,
			transactionType: "Content Purchases",
			transferDateTime: content.purchaseDate,
			title: content.videoName
		}))

		let allTransactions = [...solanaTransactions, ...purchasedContentTransactions]

		// Filter by title
		if (!_.isEmpty(positionsAndTransactionsClass.walletFilter.transactionTitleIncludes)) {
			const lowercaseTitle = positionsAndTransactionsClass.walletFilter.transactionTitleIncludes.toLowerCase()
			allTransactions = allTransactions.filter(transaction =>
				transaction.title.toLowerCase().includes(lowercaseTitle)
			)
		}

		// Filter by transaction type:
		allTransactions = allTransactions.filter(transaction =>
			positionsAndTransactionsClass.walletFilter.transactionType.includes(transaction.transactionType as TransactionTypes)
		)

		// Sort transactions
		return allTransactions.slice().sort((a, b) =>
			positionsAndTransactionsClass.walletFilter.orderDateBy === "asc"
				? new Date(a.transferDateTime).getTime() - new Date(b.transferDateTime).getTime()
				: new Date(b.transferDateTime).getTime() - new Date(a.transferDateTime).getTime()
		)
	})
}
