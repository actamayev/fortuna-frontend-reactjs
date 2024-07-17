import { useEffect } from "react"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import TransactionsHeader from "./transactions-header/transactions-header"
import useMyTransactionsToShow from "../../../hooks/positions-and-transactions/transactions-to-show"
import useRetrieveTransactions from "../../../hooks/positions-and-transactions/retrieve-transactions"

function TransactionsMap() {
	const retrieveTransactions = useRetrieveTransactions()
	const myTransactionsToShow = useMyTransactionsToShow()

	useEffect(() => {
		void retrieveTransactions()
	}, [retrieveTransactions])

	return (
		<div className="flex flex-col w-3/4">
			<TransactionsHeader />
			{myTransactionsToShow.map(transaction => (
				<SingleTransaction key={transaction.solTransferId} transaction={transaction} />
			))}
		</div>
	)
}

export default observer(TransactionsMap)
