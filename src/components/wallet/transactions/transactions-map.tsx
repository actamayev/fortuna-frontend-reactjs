import { useEffect } from "react"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import TransactionsHeader from "./transactions-header/transactions-header"
import TransactionSummaryCard from "./transaction-summary-card/transaction-summary-card"
import useMyTransactionsToShow from "../../../hooks/positions-and-transactions/transactions-to-show"
import useRetrieveTransactions from "../../../hooks/positions-and-transactions/retrieve-transactions"

function TransactionsMap() {
	const retrieveTransactions = useRetrieveTransactions()
	const myTransactionsToShow = useMyTransactionsToShow()

	useEffect(() => {
		void retrieveTransactions()
	}, [retrieveTransactions])

	return (
		<div className="flex w-full">
			<div className="flex flex-col w-3/4 ml-1">
				<TransactionsHeader />
				{myTransactionsToShow.map((transaction, index) => (
					<div key={index}>
						<SingleTransaction transaction={transaction} />
					</div>
				))}
			</div>
			<div className="w-1/4 ml-4">
				<TransactionSummaryCard />
			</div>
		</div>
	)
}

export default observer(TransactionsMap)
