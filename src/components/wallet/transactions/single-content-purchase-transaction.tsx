import { observer } from "mobx-react"
import { FaShoppingBag } from "react-icons/fa"
import useDefaultCurrency from "../../../hooks/memos/default-currency"
import { useActualDateFormatter } from "../../../hooks/date-formatter"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"

interface Props {
	transaction: MyPurchasedExclusiveContent
}

function SingleContentPurchaseTransaction(props: Props) {
	const { transaction } = props
	const defaultCurrency = useDefaultCurrency()
	const actualDateFormatter = useActualDateFormatter()

	return (
		<div
			className="grid grid-cols-7 gap-4 bg-white dark:bg-neutral-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-3
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer rounded-sm"
		>
			<div className="col-span-1">
				{actualDateFormatter(transaction.purchaseDate)}
			</div>
			<div className="col-span-1">
				<div className="flex flex-row items-center space-x-2">
					<FaShoppingBag size={25}/>
					<div>Content Purchase</div>
				</div>
			</div>
			<div className="col-span-1">
				<div className="flex justify-end text-red-600 dark:text-red-400">
					-
					{(defaultCurrency === "usd") ? (
						<>${numberWithCommasFixed(transaction.priceInUsd, 2)}</>
					) : (
						<>{numberWithCommasFixed(transaction.priceInSol, 4)} SOL</>
					)}
				</div>
			</div>
			<div className="col-span-4">
				<span>
					Purchased Exclusive Access to
					<div className="hover:underline">
						{transaction.videoName}
					</div>
				</span>
			</div>
		</div>
	)
}

export default observer(SingleContentPurchaseTransaction)  // Keep this an observer (the defaultCurrency is a memo)
