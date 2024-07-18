import _ from "lodash"
import { useMemo } from "react"
import { observer, useObserver } from "mobx-react"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function Deposits() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const transactionsTimeRange = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return "Month"
		return positionsAndTransactionsClass.transactionsTimeRange
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass, positionsAndTransactionsClass?.transactionsTimeRange])

	const depositsSol = useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return null
		return positionsAndTransactionsClass.calculateDepositsSol()
	})

	const depositsUsd = useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return null
		return positionsAndTransactionsClass.calculateDepositsUsd()
	})

	return (
		<div className="flex flex-col">
			<div className="text-lg font-bold">
				<ShowProvidedUsdOrSolPrice
					solPriceToDisplay={
						<>
							{_.isNull(depositsSol) ?
								(<>Loading...</>) :
								(<>+{numberWithCommasFixed(depositsSol, 4)} SOL</>)
							}
						</>
					}
					usdPriceToDisplay={
						<>
							{_.isNull(depositsUsd) ?
								(<>Loading...</>) :
								(<>+${numberWithCommasFixed(depositsUsd, 2)}</>)
							}
						</>
					}
				/>
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Deposits {" "}
				{transactionsTimeRange !== "Today" && (<>this {" "}</>)}
				<span
					className="cursor-pointer underline decoration-dotted"
					onClick={positionsAndTransactionsClass?.handleTimeRangeClick}
				>
					{transactionsTimeRange.toLowerCase()}
				</span>
			</div>
		</div>
	)
}

export default observer(Deposits)
