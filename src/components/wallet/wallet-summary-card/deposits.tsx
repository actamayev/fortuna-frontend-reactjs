import { useMemo } from "react"
import { observer, useObserver } from "mobx-react"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { useNumberWithCommasFixed } from "../../../hooks/numbers/numbers-with-commas"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "../../usd-or-sol/super-money-style"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function Deposits() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const defaultCurrency = useDefaultCurrency()
	const numberWithCommasFixed = useNumberWithCommasFixed()

	const transactionsTimeRange = useMemo(() => {
		return positionsAndTransactionsClass.transactionsTimeRange
	}, [positionsAndTransactionsClass.transactionsTimeRange])

	const depositsSol = useObserver(() => positionsAndTransactionsClass.calculateDepositsSol())
	const depositsUsd = useObserver(() => positionsAndTransactionsClass.calculateDepositsUsd())

	const solDepositsObject = useMemo(() => {
		return numberWithCommasFixed(depositsSol, 2)
	}, [depositsSol, numberWithCommasFixed])

	const usdDepositsObject = useMemo(() => {
		return numberWithCommasFixed(depositsUsd, 2)
	}, [depositsUsd, numberWithCommasFixed])

	return (
		<div className="flex flex-col">
			<div className="text-lg font-bold">
				{defaultCurrency === "sol" && (
					<>
						+
						<SuperMoneyStyleSol
							dollars={solDepositsObject.dollars}
							cents={solDepositsObject.cents}
						/>
					</>
				)}
				{defaultCurrency === "usd" && (
					<>
						+
						<SuperMoneyStyleDollars
							dollars={usdDepositsObject.dollars}
							cents={usdDepositsObject.cents}
						/>
					</>
				)}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Deposits&nbsp;
				{transactionsTimeRange !== "Today" && (<>this&nbsp;</>)}
				<span
					className="cursor-pointer underline decoration-dotted"
					onClick={positionsAndTransactionsClass.handleTimeRangeClick}
				>
					{transactionsTimeRange.toLowerCase()}
				</span>
			</div>
		</div>
	)
}

export default observer(Deposits)
