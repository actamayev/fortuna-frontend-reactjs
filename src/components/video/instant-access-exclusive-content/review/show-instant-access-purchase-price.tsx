import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ShowInstantAccessPurchasePrice() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video) || _.isNull(video.listingPriceToAccessContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					Instant Access Price (USD):
				</div>
				<div>
					${(video.listingPriceToAccessContentUsd).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = video.listingPriceToAccessContentUsd / solPriceInUSD

	return (
		<div className="flex justify-between">
			<div>
				Instant Access Price (SOL):
			</div>
			<div>
				{(videoListingSharePriceSol).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowInstantAccessPurchasePrice)
