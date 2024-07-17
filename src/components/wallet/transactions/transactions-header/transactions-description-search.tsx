import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function TransactionDescriptionSearch() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(positionsAndTransactionClass)) return
		positionsAndTransactionClass.updateCreatorVideosFilter("transactionTitleIncludes", event.target.value)
	}, [positionsAndTransactionClass])

	const descriptionIncludes = useMemo(() => {
		if (_.isNull(positionsAndTransactionClass)) return ""
		return positionsAndTransactionClass.walletFilter.transactionTitleIncludes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionClass, positionsAndTransactionClass?.walletFilter.transactionTitleIncludes])

	return (
		<input
			type="text"
			placeholder="Description contains..."
			value={descriptionIncludes}
			onChange={handleSearch}
			className="w-full outline-none bg-inherit"
		/>
	)
}

export default observer(TransactionDescriptionSearch)
