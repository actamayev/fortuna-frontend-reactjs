import _ from "lodash"
import { useMemo } from "react"
import { observer, useObserver } from "mobx-react"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "../../usd-or-sol/super-money-style"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function Withdrawals() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const defaultCurrency = useDefaultCurrency()

	const transactionsTimeRange = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return "Month"
		return positionsAndTransactionsClass.transactionsTimeRange
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass, positionsAndTransactionsClass?.transactionsTimeRange])

	const withdrawalsUsd = useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return null
		return positionsAndTransactionsClass.calculateWithdrawalsUsd()
	})

	const withdrawalsSol = useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return null
		return positionsAndTransactionsClass.calculateWithdrawalsSol()
	})

	const solWithdrawalsObject = numberWithCommasFixed(withdrawalsSol, 4)
	const usdWithdrawalsObject = numberWithCommasFixed(withdrawalsUsd, 2)

	return (
		<div className="flex flex-col">
			<div className="text-lg font-bold">
				{defaultCurrency === "sol" && (
					<>
						{_.isNull(withdrawalsSol) ? (
							<>Loading...</>
						) : (
							<>
								-
								<SuperMoneyStyleSol
									dollars={solWithdrawalsObject.dollars}
									cents={solWithdrawalsObject.cents}
								/>
							</>
						)}
					</>
				)}
				{defaultCurrency === "usd" && (
					<>
						{_.isNull(withdrawalsUsd) ? (
							<>Loading...</>
						) : (
							<>
								-
								<SuperMoneyStyleDollars
									dollars={usdWithdrawalsObject.dollars}
									cents={usdWithdrawalsObject.cents}
								/>
							</>
						)}
					</>
				)}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Withdrawals&nbsp;
				{transactionsTimeRange !== "Today" && (<>this&nbsp;</>)}
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

export default observer(Withdrawals)
