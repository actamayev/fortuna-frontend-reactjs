import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../button"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useAuthContext } from "../../../contexts/auth-context"
import InitialPurchaseInfo from "./initial/initial-purchase-info"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { useExchangeContext } from "../../../contexts/exchange-context"

interface Props {
	video: VideoData
}

function PurchaseSharesCard(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const exchangeClass = useExchangeContext()
	const navigate = useTypedNavigate()

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title="Please create an account to purchase shares"
				className="font-semibold"
			/>
		)
	}

	if (video.splListingStatus === "SOLDOUT") {
		return <div className="dark:text-white">Sold out</div>
	}

	if (_.isNull(exchangeClass)) return null

	return (
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-4 h-full">
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "initial" && <InitialPurchaseInfo />}
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</div>
	)
}

export default observer(PurchaseSharesCard)
