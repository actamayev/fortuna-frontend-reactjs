import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import { useAuthContext } from "../../../contexts/auth-context"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useVideoContext } from "../../../contexts/video-context"
import InitialPurchaseInfo from "./initial/initial-purchase-info"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { useExchangeContext } from "../../../contexts/exchange-context"

function PurchaseSharesCard() {
	const authClass = useAuthContext()
	const exchangeClass = useExchangeContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

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
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-4 m-2 w-1/3">
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "initial" && <InitialPurchaseInfo />}
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</div>
	)
}

export default observer(PurchaseSharesCard)
