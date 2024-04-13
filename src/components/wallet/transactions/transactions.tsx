import _ from "lodash"
import { useEffect } from "react"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import { useSolanaContext } from "../../../contexts/solana-context"
import useRetrieveTransactions from "../../../hooks/solana/retrieve-transactions"

function Transactions() {
	const solanaClass = useSolanaContext()
	const retrieveTransactions = useRetrieveTransactions()

	useEffect(() => {
		void retrieveTransactions()
	}, [retrieveTransactions])

	if (_.isNull(solanaClass)) return null

	const transactionKeys = Array.from(solanaClass.myTransactionMap.keys())

	return (
		<>
			{transactionKeys.map((item) => {
				return <SingleTransaction key={item} transactionId={item} />
			})}
		</>
	)
}

export default observer(Transactions)
