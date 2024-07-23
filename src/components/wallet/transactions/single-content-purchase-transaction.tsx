import { observer } from "mobx-react"
import { FaShoppingBag } from "react-icons/fa"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"
import useNavigateToVideoNewPage from "../../../hooks/navigate/navigate-to-video-new-page"

interface Props {
	transaction: MyPurchasedExclusiveContent
}

function SingleContentPurchaseTransaction(props: Props) {
	const { transaction } = props
	const navigateToVideoNewPage = useNavigateToVideoNewPage()
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()

	return (
		<div
			className="grid grid-cols-8 gap-4 bg-inherit hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2.5
				text-zinc-950 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer rounded-sm text-sm"
		>
			<div className="col-span-1 flex items-center">
				{abbreviatedDateFormatter(transaction.purchaseDate)}
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
						solPriceToDisplay={transaction.priceInSol}
						usdPriceToDisplay={transaction.priceInUsd}
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
						onClick={() => navigateToVideoNewPage(transaction.uuid)}
					>
						{transaction.videoName}
					</div>
				</div>
			</div>
			<div className="col-span-1 flex justify-end">
				{(!transaction.newWalletBalanceSol || !transaction.newWalletBalanceUsd) ? (
					<>--</>
				) : (
					<ShowProvidedUsdOrSolPrice
						solPriceToDisplay={transaction.newWalletBalanceSol}
						usdPriceToDisplay={transaction.newWalletBalanceUsd}
						roundOrFixed="fixed"
					/>
				)}
			</div>
		</div>
	)
}

export default observer(SingleContentPurchaseTransaction)  // Keep this an observer (the defaultCurrency is a memo)
