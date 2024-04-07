import _ from "lodash"
import { observer } from "mobx-react"
import SingleTransaction from "./single-transaction"
import { useSolanaContext } from "../../../contexts/solana-context"
import useRetrievePastTransactions from "../../../hooks/solana/retrieve-transactions"

function Transactions() {
	const solanaClass = useSolanaContext()
	useRetrievePastTransactions()

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
