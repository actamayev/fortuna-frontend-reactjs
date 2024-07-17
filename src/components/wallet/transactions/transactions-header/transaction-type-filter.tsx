import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaShoppingBag } from "react-icons/fa"
import { BsArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from "react-icons/bs"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function TransactionTypeFilter() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	const onClickAction = useCallback((transactionType: TransactionTypes) => {
		if (_.isNull(positionsAndTransactionClass)) return
		// console.log(positionsAndTransactionClass.walletFilter.transactionType)
		positionsAndTransactionClass.updateTransactionTypeFilter(transactionType)
		// console.log(positionsAndTransactionClass.walletFilter.transactionType)
	}, [positionsAndTransactionClass])

	const colorClasses = useCallback((transactionType: TransactionTypes) => {
		if (_.isNull(positionsAndTransactionClass)) return
		let classes = "p-1 rounded-lg cursor-pointer \
			bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-black dark:text-white"
		if (positionsAndTransactionClass.walletFilter.transactionType.includes(transactionType)) {
			console.log(transactionType)
			classes = "p-1 rounded-lg cursor-pointer bg-black dark:bg-white text-white dark:text-black"
		}
		return classes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionClass, positionsAndTransactionClass?.walletFilter.transactionType])

	return (
		<div className="flex flex-row space-x-2 text-zinc-950 dark:text-zinc-200">
			<div>Type</div>
			<div
				className={colorClasses("Content Purchases")}
				onClick={() => onClickAction("Content Purchases")}
			>
				<FaShoppingBag />
			</div>
			<div
				className={colorClasses("Withdrawals")}
				onClick={() => onClickAction("Withdrawals")}
			>
				<BsArrowUpRightSquareFill />
			</div>
			<div
				className={colorClasses("Deposits")}
				onClick={() => onClickAction("Deposits")}
			>
				<BsArrowDownLeftSquareFill  />
			</div>
		</div>
	)
}

export default observer(TransactionTypeFilter)
