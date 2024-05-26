import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ShowPurchasePrice() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNull(exchangeClass)) return null

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	const numberOfTokensPurchasing = exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing
	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between mb-1">
				<div>
					{numberOfTokensPurchasing} {" "}
					Share{numberOfTokensPurchasing > 1 ? "s" : ""} {" "}
					X ${_.round(video.listingSharePriceUsd, 2)}
				</div>
				<div>
					${(video.listingSharePriceUsd * numberOfTokensPurchasing).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = video.listingSharePriceUsd / solPriceInUSD

	return (
		<div className="flex justify-between mb-1">
			<div>
				{numberOfTokensPurchasing} {" "}
				Share{numberOfTokensPurchasing > 1 ? "s" : ""} {" "}
				X {_.round(videoListingSharePriceSol, 4)} SOL
			</div>
			<div>
				{(videoListingSharePriceSol * numberOfTokensPurchasing).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowPurchasePrice)
