import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useCallback, useMemo } from "react"
import BackButton from "../../../buttons/back-button"
import { useVideoContext } from "../../../../contexts/video-context"
import { useMarketContext } from "../../../../contexts/market-context"
import ConfirmInstantAccessButton from "./confirm-instant-access-button"
import ShowUsdOrSolPrice from "../../../usd-or-sol/show-usd-or-sol-price"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"
import ShowRemainingWalletBalanceAfterInstantAccessPurchase from "./show-remaining-wallet-balance-after-instant-access-purchase"

function ReviewInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const marketClass = useMarketContext()

	const video = videoClass.findVideoFromUUID(videoUUID)

	const setInstantAccessToExclusiveContentStage = useCallback(() => {
		marketClass.setInstantAccessToExclusiveContentStage("initial")
	} ,[marketClass])

	const instantAccessToExclusiveContentStage = useMemo(() => {
		return marketClass.instantAccessToExclusiveContentStage
	}, [marketClass.instantAccessToExclusiveContentStage])

	if (
		_.isUndefined(video) ||
		video.isVideoExclusive === false ||
		instantAccessToExclusiveContentStage !== "review"
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
				<ShowUsdOrSolPrice
					usdAmount={getTieredAccessPriceUsd(video)}
					roundOrFixed="round"
				/>
			</div>

			<div className="flex justify-between mb-2">
				<div>New Balance:</div>
				<ShowRemainingWalletBalanceAfterInstantAccessPurchase video={video}/>
			</div>

			<div className="flex justify-center mt-2">
				<ConfirmInstantAccessButton video={video}/>
			</div>
		</>
	)
}

export default observer(ReviewInstantAccessInfo)
