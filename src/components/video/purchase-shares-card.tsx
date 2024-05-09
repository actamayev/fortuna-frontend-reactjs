import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import InitialPurchaseInfo from "./initial/initial-purchase-info"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

function PurchaseSharesCard() {
	const solanaClass = useSolanaContext()
	const authClass = useAuthContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	if (video.splListingStatus === "SOLDOUT") {
		return <div className="dark:text-white">Sold out</div>
	}

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
	if (_.isNull(solanaClass)) return null

	return (
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-4 m-2 w-1/3">
			{solanaClass.purchaseSplSharesDetails.purchaseStage === "initial" && <InitialPurchaseInfo />}
			{solanaClass.purchaseSplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</div>
	)
}

export default observer(PurchaseSharesCard)
