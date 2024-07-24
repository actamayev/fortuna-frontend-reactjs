import { observer } from "mobx-react"
import TransactionSignature from "./transaction-signature"
import SuccessStatusMessage from "./success-status-message"
import { useDateTimeFormatter } from "../../../../hooks/date-formatter"
import ShowProvidedUsdOrSolPrice from "../../../usd-or-sol/show-provided-usd-or-sol-price"
import useNavigateToVideoNewPage from "../../../../hooks/navigate/navigate-to-video-new-page"
import TransactionSummaryCardCategoryHeader from "./transaction-summary-card-category-header"

interface Props {
	exclusiveContentPurchase: MyPurchasedExclusiveContent
}

function ShowExclusiveContentAccessDetailsSummaryCard(props: Props) {
	const { exclusiveContentPurchase } = props
	const dateTimeFormatter = useDateTimeFormatter()
	const navigateToVideoNewPage = useNavigateToVideoNewPage()

	return (
		<div className="flex flex-col space-y-2">
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Date" />
				{dateTimeFormatter(exclusiveContentPurchase.purchaseDate)}
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Type" />
				<div className="flex flex-row items-center ml-1 space-x-1 text-blue-600 dark:text-blue-400">
					<div>Content Purchase</div>
				</div>
			</div>
			<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
				<TransactionSummaryCardCategoryHeader categoryName="Description" />
				<div className="flex flex-row">
					<div className="flex-shrink-0">Purchased Exclusive Access to&nbsp;</div>
					<div
						className="cursor-pointer underline decoration-dotted
						hover:decoration-solid"
						onClick={() => navigateToVideoNewPage(exclusiveContentPurchase.uuid)}
					>
						{exclusiveContentPurchase.videoName}
					</div>
				</div>
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="New Balance" />
				{(!exclusiveContentPurchase.newWalletBalanceSol || !exclusiveContentPurchase.newWalletBalanceUsd) ? (
					<>--</>
				) : (
					<ShowProvidedUsdOrSolPrice
						solPriceToDisplay={exclusiveContentPurchase.newWalletBalanceSol}
						usdPriceToDisplay={exclusiveContentPurchase.newWalletBalanceUsd}
						roundOrFixed="fixed"
					/>
				)}
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Amount" />
				-<ShowProvidedUsdOrSolPrice
					solPriceToDisplay={exclusiveContentPurchase.priceInSol}
					usdPriceToDisplay={exclusiveContentPurchase.priceInUsd}
					roundOrFixed="fixed"
				/>
			</div>
			<div className="border-b border-zinc-300 dark:border-zinc-700"></div>
			<div><TransactionSignature transactionSignature={"abc"} /></div>
			<div><SuccessStatusMessage /></div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Fee" />
				0 (no transaction fees when making content purchases)
			</div>
		</div>
	)
}

export default observer(ShowExclusiveContentAccessDetailsSummaryCard)
