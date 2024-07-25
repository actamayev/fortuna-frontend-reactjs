import { observer } from "mobx-react"
import TransactionSummaryCardCategoryHeader from "../transaction-summary-card-category-header"
import useNavigateToVideoNewPage from "../../../../../hooks/navigate/navigate-to-video-new-page"

interface Props {
	exclusiveContentPurchase: MyPurchasedExclusiveContent
}

function ExclusiveVideoContentAccessDescription(props: Props) {
	const { exclusiveContentPurchase } = props
	const navigateToVideoNewPage = useNavigateToVideoNewPage()

	return (
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
	)
}

export default observer(ExclusiveVideoContentAccessDescription)
