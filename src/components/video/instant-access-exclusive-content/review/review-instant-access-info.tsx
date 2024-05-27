import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import InstantAccessBackButton from "./instant-access-back-button"
import { useVideoContext } from "../../../../contexts/video-context"
import ConfirmInstantAccessButton from "./confirm-instant-access-button"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import ShowInstantAccessPurchasePrice from "./show-instant-access-purchase-price"
import ShowRemainingWalletBalanceAfterInstantAccessPurchase from "./show-remaining-wallet-balance-after-instant-access-purchase"

function ReviewInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const exchangeClass = useExchangeContext()

	const video = videoClass.findVideoFromUUID(videoUUID)

	if (
		_.isUndefined(video) ||
		video.isSplExclusive === false ||
		_.isNull(exchangeClass) ||
		exchangeClass.instantAccessToExclusiveContentStage !== "review"
	) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<InstantAccessBackButton />
				<div className="text-center flex-1">
					Review Instant Access Purchase
				</div>
			</div>

			<div className="flex justify-between mb-1">
				<div>Instant Access Price:</div>
				<div>
					<ShowInstantAccessPurchasePrice video={video}/>
				</div>
			</div>

			<div className="flex justify-between mb-2">
				<div>New Balance:</div>
				<div>
					<ShowRemainingWalletBalanceAfterInstantAccessPurchase video={video}/>
				</div>
			</div>

			<div className="flex justify-center mt-2">
				<ConfirmInstantAccessButton />
			</div>
		</>
	)
}

export default observer(ReviewInstantAccessInfo)
