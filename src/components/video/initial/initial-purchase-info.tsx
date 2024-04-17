import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import ReviewPurchaseButton from "./review-purchase-button"
import useTypedNavigate from "../../../hooks/typed-navigate"
import { useAuthContext } from "../../../contexts/auth-context"
import { useVideoContext } from "../../../contexts/video-context"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"

function InitialPurchaseInfo() {
	const authClass = useAuthContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const navigate = useTypedNavigate()

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.contextForVideo(videoUUID)
	if (_.isUndefined(video)) return null

	if (_.isEqual(video.sharesRemainingForSale, 0)) {
		return <>Sold out</>
	}

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-300"
				hoverClass="hover:bg-blue-400"
				title="Please create an account with Fortuna to purchase shares"
			/>
		)
	}

	return (
		<>
			<div className="text-center font-semibold">Purchase Shares</div>
			<SelectNumberSharesToPurchase />
			<br />

			<ReviewPurchaseButton />
		</>
	)
}

export default observer(InitialPurchaseInfo)
