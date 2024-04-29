import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import ReviewPurchaseButton from "./review-purchase-button"
import { useAuthContext } from "../../../contexts/auth-context"
import { useVideoContext } from "../../../contexts/video-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"

function InitialPurchaseInfo() {
	const authClass = useAuthContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	if (_.isEqual(video.sharesRemainingForSale, 0)) {
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

	return (
		<>
			<div className="text-center font-semibold dark:text-white">Purchase Shares</div>
			<div>
				<SelectNumberSharesToPurchase />
			</div>

			<ReviewPurchaseButton />
		</>
	)
}

export default observer(InitialPurchaseInfo)
