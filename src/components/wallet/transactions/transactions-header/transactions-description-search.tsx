import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function TransactionsDescriptionSearch() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		positionsAndTransactionClass.updateWalletFilter("transactionTitleIncludes", event.target.value)
	}, [positionsAndTransactionClass])

	const transactionTitleIncludes = useMemo(() => {
		return positionsAndTransactionClass.walletFilter.transactionTitleIncludes
	}, [positionsAndTransactionClass.walletFilter.transactionTitleIncludes])

	return (
		<input
			type="text"
			placeholder="Description contains..."
			value={transactionTitleIncludes}
			onChange={handleSearch}
			className="w-full outline-none bg-inherit"
		/>
	)
}

export default observer(TransactionsDescriptionSearch)
