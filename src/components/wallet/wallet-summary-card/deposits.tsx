import _ from "lodash"
import { useMemo } from "react"
import { observer, useObserver } from "mobx-react"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "../../usd-or-sol/super-money-style"

function Deposits() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const defaultCurrency = useDefaultCurrency()

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

	const solDepositsObject = numberWithCommasFixed(depositsSol, 4)
	const usdDepositsObject = numberWithCommasFixed(depositsUsd, 2)

	return (
		<div className="flex flex-col">
			<div className="text-lg font-bold">
				{defaultCurrency === "sol" && (
					<>
						{_.isNull(depositsSol) ? (
							<>Loading...</>
						) : (
							<>
								+
								<SuperMoneyStyleSol
									dollars={solDepositsObject.dollars}
									cents={solDepositsObject.cents}
								/>
							</>
						)}
					</>
				)}
				{defaultCurrency === "usd" && (
					<>
						{_.isNull(depositsUsd) ? (
							<>Loading...</>
						) : (
							<>
								+
								<SuperMoneyStyleDollars
									dollars={usdDepositsObject.dollars}
									cents={usdDepositsObject.cents}
								/>
							</>
						)}
					</>
				)}
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
