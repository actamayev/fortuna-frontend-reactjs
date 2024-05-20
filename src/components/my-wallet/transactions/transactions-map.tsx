import _ from "lodash"
import { useEffect } from "react"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import { useSolanaContext } from "../../../contexts/solana-context"
import useRetrieveTransactions from "../../../hooks/solana/retrieve-transactions"

function TransactionsMap() {
	const solanaClass = useSolanaContext()
	const retrieveTransactions = useRetrieveTransactions()

	useEffect(() => {
		void retrieveTransactions()
	}, [retrieveTransactions])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			{solanaClass.myTransactions.map(transaction => (
				<SingleTransaction key={transaction.solTransferId} transaction={transaction} />
			))}
		</>
	)
}

export default observer(TransactionsMap)
