import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function SortContentByArrow() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	const onClickAction = useCallback(() => {
		if (_.isNull(positionsAndTransactionClass)) return
		positionsAndTransactionClass.updateMyTransactionsOrderBy()
	}, [positionsAndTransactionClass])

	const pointingUpOrDown = useMemo(() => {
		if (_.isNull(positionsAndTransactionClass)) return "desc"
		return positionsAndTransactionClass.walletFilter.orderDateBy
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionClass, positionsAndTransactionClass?.walletFilter.orderDateBy])

	return (
		<div
			className="flex items-center cursor-pointer dark:hover:text-white hover:text-zinc-900 dark:text-white text-zinc-900 font-medium"
			onClick={onClickAction}
		>
			Date
			<div className="relative items-center justify-center text-black dark:text-white ml-2">
				{pointingUpOrDown === "desc" ?
					<FaArrowDown /> :
					<FaArrowUp />}
			</div>
		</div>
	)
}

export default observer(SortContentByArrow)
