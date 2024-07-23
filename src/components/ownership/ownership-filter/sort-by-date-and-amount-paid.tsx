import _ from "lodash"
import { useCallback, useMemo } from "react"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import { observer } from "mobx-react"
import Button from "../../buttons/button"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function SortByDateAndAmountPaid() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const handleUpdateFilter = useCallback((sortBy: OwnershipSortBy) => {
		if (_.isNull(positionsAndTransactionsClass)) return
		positionsAndTransactionsClass.updateOwnershipFilter(sortBy)
	}, [positionsAndTransactionsClass])

	const colorClasses = useCallback((ownershipFilter: OwnershipSortBy) => {
		if (_.isNull(positionsAndTransactionsClass)) return ""
		let classes = "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-black dark:text-white rounded-lg"
		if (ownershipFilter === positionsAndTransactionsClass.ownershipFilter.sortBy) {
			classes = "bg-black dark:bg-white text-white dark:text-black rounded-lg"
		}
		return classes
	}, [positionsAndTransactionsClass])

	const currentOwnershipFilter = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return
		return positionsAndTransactionsClass.ownershipFilter
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.ownershipFilter])

	return (
		<div className="flex flex-row space-x-2 font-semibold">
			<>
				<Button
					title="Date Purchased"
					colorClass={colorClasses("Date Purchased")}
					hoverClass=""
					onClick={() => handleUpdateFilter("Date Purchased")}
					titleIcon={currentOwnershipFilter?.sortBy === "Date Purchased" && (
						<>
							{currentOwnershipFilter.orderBy === "asc" ? (
								<FaArrowUp />
							) : (
								<FaArrowDown />
							)}
						</>
					)}
				/>
			</>

			<>
				<Button
					title="Amount Paid"
					colorClass={colorClasses("Amount Paid")}
					hoverClass=""
					onClick={() => handleUpdateFilter("Amount Paid")}
					titleIcon={currentOwnershipFilter?.sortBy === "Amount Paid" && (
						<>
							{currentOwnershipFilter.orderBy === "asc" ? (
								<FaArrowUp />
							) : (
								<FaArrowDown />
							)}
						</>
					)}
				/>
			</>
		</div>
	)
}

export default observer(SortByDateAndAmountPaid)
