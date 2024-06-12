import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import BackButton from "../../../buttons/back-button"
import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"
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

	const setInstantAccessToExclusiveContentStage = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("initial")
	} ,[marketClass])

	if (
		_.isUndefined(video) ||
		video.isVideoExclusive === false ||
		marketClass?.instantAccessToExclusiveContentStage !== "review"
	) return null

	return (
		<>
			<div className="relative flex flex-row justify-between items-center font-semibold w-full mb-2">
				<div className="absolute left-0">
					<BackButton onClick={setInstantAccessToExclusiveContentStage} />
				</div>
				<div className="text-center w-full inset-x-0 mx-auto text-xl">
					Review Purchase
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
