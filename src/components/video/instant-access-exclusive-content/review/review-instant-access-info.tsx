import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"
import InstantAccessBackButton from "./instant-access-back-button"
import { useVideoContext } from "../../../../contexts/video-context"
import { useMarketContext } from "../../../../contexts/market-context"
import ConfirmInstantAccessButton from "./confirm-instant-access-button"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"
import getCurrentExclusiveAccessTier from "../../../../utils/video-access-tiers/get-current-exclusive-access-tier"
import ShowRemainingWalletBalanceAfterInstantAccessPurchase from "./show-remaining-wallet-balance-after-instant-access-purchase"

function ReviewInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const marketClass = useMarketContext()

	const video = videoClass.findVideoFromUUID(videoUUID)

	if (
		_.isUndefined(video) ||
		video.isVideoExclusive === false ||
		marketClass?.instantAccessToExclusiveContentStage !== "review"
	) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<InstantAccessBackButton />
				<div className="text-center flex-1">
					Purchase Review
				</div>
			</div>

			<div className="flex justify-between mb-1">
				<div>Instant Access Price:</div>
				<ShowUsdOrSolPrice usdAmount={getTieredAccessPriceUsd(video)} />
			</div>

			<div className="flex justify-between mb-2">
				<div>New Balance:</div>
				<ShowRemainingWalletBalanceAfterInstantAccessPurchase video={video}/>
			</div>

			<div className="flex justify-center mt-2">
				<ConfirmInstantAccessButton tierNumber={getCurrentExclusiveAccessTier(video)}/>
			</div>
		</>
	)
}

export default observer(ReviewInstantAccessInfo)
