import { observer } from "mobx-react"
import SuccessStatusMessage from "../success-status-message"
import { useDateTimeFormatter } from "../../../../../hooks/date-formatter"
import TransactionSignatureSection from "../transaction-signature-section"
import NewWalletBalanceTemplate from "../../../new-wallet-balance-template"
import ShowProvidedUsdOrSolPrice from "../../../../usd-or-sol/show-provided-usd-or-sol-price"
import useNavigateToVideoNewPage from "../../../../../hooks/navigate/navigate-to-video-new-page"
import TransactionSummaryCardCategoryHeader from "../transaction-summary-card-category-header"

interface Props {
	exclusiveContentPurchase: MyPurchasedExclusiveContent
}

function ShowExclusiveContentAccessDetailsSummaryCard(props: Props) {
	const { exclusiveContentPurchase } = props
	const dateTimeFormatter = useDateTimeFormatter()
	const navigateToVideoNewPage = useNavigateToVideoNewPage()

	return (
		<div className="flex flex-col space-y-2 text-base">
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Date" />
				{dateTimeFormatter(exclusiveContentPurchase.purchaseDate)}
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Type" />
				<div className="flex flex-row items-center text-blue-600 dark:text-blue-400">
					<div>Content Purchase</div>
				</div>
			</div>
			<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
				<div className="flex flex-col">
					<TransactionSummaryCardCategoryHeader categoryName="Description" />
					<div className="flex flex-wrap">
						<div className="flex-shrink-0">Purchased Exclusive Access to&nbsp;</div>
						<div
							className="cursor-pointer underline decoration-dotted hover:decoration-solid"
							onClick={() => navigateToVideoNewPage(exclusiveContentPurchase.uuid)}
						>
							{exclusiveContentPurchase.videoName}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="New Balance" />
				<NewWalletBalanceTemplate
					newWalletBalanceSol={exclusiveContentPurchase.newWalletBalanceSol}
					newWalletBalanceUsd={exclusiveContentPurchase.newWalletBalanceUsd}
				/>
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
			<div>
				<TransactionSignatureSection transactionSignature={exclusiveContentPurchase.videoAccessPurchaseTransactionSignature} />
			</div>
			<div><SuccessStatusMessage /></div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Fee" />
				<ShowProvidedUsdOrSolPrice
					usdPriceToDisplay={0}
					solPriceToDisplay={0}
					roundOrFixed="fixed"
				/>&nbsp;(no associated fees)
			</div>
		</div>
	)
}

export default observer(ShowExclusiveContentAccessDetailsSummaryCard)
