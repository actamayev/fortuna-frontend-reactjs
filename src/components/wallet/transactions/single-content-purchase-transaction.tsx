import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { FaShoppingBag } from "react-icons/fa"
import NewWalletBalanceTemplate from "../new-wallet-balance-template"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"
import useNavigateToVideoNewPage from "../../../hooks/navigate/navigate-to-video-new-page"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

interface Props {
	exclusiveContentPurchase: MyPurchasedExclusiveContent
}

function SingleContentPurchaseTransaction(props: Props) {
	const { exclusiveContentPurchase } = props
	const navigateToVideoNewPage = useNavigateToVideoNewPage()
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const setTransactionIdToFocusOn = useCallback(() => {
		if (_.isNull(positionsAndTransactionsClass)) return
		positionsAndTransactionsClass.updateTransactionToFocusOn(exclusiveContentPurchase.uuid)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exclusiveContentPurchase.uuid, positionsAndTransactionsClass?.transactionIdToFocusOn])

	const isCurrentTransactionFocusedOn = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return false
		return positionsAndTransactionsClass.transactionIdToFocusOn === exclusiveContentPurchase.uuid
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.transactionIdToFocusOn, exclusiveContentPurchase.uuid])

	return (
		<div
			className={`grid grid-cols-8 gap-4 py-2.5
			text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer text-sm
			${isCurrentTransactionFocusedOn ?
			"bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600" : "bg-inherit hover:bg-zinc-100 dark:hover:bg-zinc-800"}
			`}
			onClick={setTransactionIdToFocusOn}
		>
			<div className="col-span-1 flex items-center">
				{abbreviatedDateFormatter(exclusiveContentPurchase.purchaseDate)}
			</div>
			<div className="col-span-2 flex items-center">
				<div className="flex flex-row items-center space-x-3 text-blue-600 dark:text-blue-400">
					<FaShoppingBag size={30} className="flex-shrink-0"/>
					<div>Content Purchase</div>
				</div>
			</div>
			<div className="col-span-1 flex items-center">
				<div className="flex justify-start text-blue-600 dark:text-blue-400">
					-
					<ShowProvidedUsdOrSolPrice
						solPriceToDisplay={exclusiveContentPurchase.priceInSol}
						usdPriceToDisplay={exclusiveContentPurchase.priceInUsd}
						roundOrFixed="fixed"
					/>
				</div>
			</div>
			<div className="col-span-3 flex items-center overflow-hidden">
				<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
					<div className="flex-shrink-0">Purchased Exclusive Access to&nbsp;</div>
					<div
						className="cursor-pointer underline decoration-dotted
						hover:decoration-solid overflow-hidden text-ellipsis whitespace-nowrap"
						onClick={() => navigateToVideoNewPage(exclusiveContentPurchase.uuid)}
					>
						{exclusiveContentPurchase.videoName}
					</div>
				</div>
			</div>
			<div className="col-span-1 flex justify-end">
				<NewWalletBalanceTemplate
					newWalletBalanceSol={exclusiveContentPurchase.newWalletBalanceSol}
					newWalletBalanceUsd={exclusiveContentPurchase.newWalletBalanceUsd}
				/>
			</div>
		</div>
	)
}

export default observer(SingleContentPurchaseTransaction)  // Keep this an observer (the defaultCurrency is a memo)
