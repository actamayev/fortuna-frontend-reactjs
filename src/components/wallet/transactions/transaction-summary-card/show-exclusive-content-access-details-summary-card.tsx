import { observer } from "mobx-react"
import { FaShoppingBag } from "react-icons/fa"
import TransactionSignature from "./transaction-signature"
import { useDateTimeFormatter } from "../../../../hooks/date-formatter"
import ShowProvidedUsdOrSolPrice from "../../../usd-or-sol/show-provided-usd-or-sol-price"
import useNavigateToVideoNewPage from "../../../../hooks/navigate/navigate-to-video-new-page"

interface Props {
	exclusiveContentPurchase: MyPurchasedExclusiveContent
}

function ShowExclusiveContentAccessDetailsSummaryCard(props: Props) {
	const { exclusiveContentPurchase } = props
	const dateTimeFormatter = useDateTimeFormatter()
	const navigateToVideoNewPage = useNavigateToVideoNewPage()

	return (
		<div className="flex flex-row">
			<div>
				Transaction Date: {dateTimeFormatter(exclusiveContentPurchase.purchaseDate)}
			</div>
			<div>
				Transaction Type:&nbsp;
				<div className="flex flex-row items-center space-x-3 text-blue-600 dark:text-blue-400">
					<FaShoppingBag size={30} className="flex-shrink-0"/>
					<div>Content Purchase</div>
				</div>
			</div>
			<div>
				Description:
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
			<div>
				New Balance:
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
			<div>
				Amount: -
				<ShowProvidedUsdOrSolPrice
					solPriceToDisplay={exclusiveContentPurchase.priceInSol}
					usdPriceToDisplay={exclusiveContentPurchase.priceInUsd}
					roundOrFixed="fixed"
				/>
			</div>
			<div>
				<TransactionSignature transactionSignature={"abc"} />
			</div>
			<div>
				Status:
				<div className="text-green-600 dark:text-green-400">
					Complete
				</div>
			</div>
			<div>
				Transaction Fee: 0 (no transaction fees when making content purchases)
			</div>
		</div>
	)
}

export default observer(ShowExclusiveContentAccessDetailsSummaryCard)
