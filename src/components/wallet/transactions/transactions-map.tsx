import _ from "lodash"
import { useEffect } from "react"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import useRetrieveTransactions from "../../../hooks/positions-and-transactions/retrieve-transactions"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function TransactionsMap() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()
	const retrieveTransactions = useRetrieveTransactions()

	useEffect(() => {
		void retrieveTransactions()
	}, [retrieveTransactions])

	if (_.isNull(positionsAndTransactionClass)) return null

	return (
		<div>
			{positionsAndTransactionClass.myTransactions.map(transaction => (
				<SingleTransaction key={transaction.solTransferId} transaction={transaction} />
			))}
		</div>
	)
}

export default observer(TransactionsMap)
