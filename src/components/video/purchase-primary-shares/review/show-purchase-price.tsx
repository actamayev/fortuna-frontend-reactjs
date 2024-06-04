import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"
import { useMarketContext } from "../../../../contexts/market-context"

function ShowPurchasePrice() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const marketClass = useMarketContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(marketClass)) return null

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	const { numberOfTokensPurchasing } = marketClass.purchasePrimarySplSharesDetails
	const { listingSharePriceUsd } = video

	if (defaultCurrency === "usd") {
		return (
			<div className="flex justify-between mb-1">
				<div>
					{numberOfTokensPurchasing} {" "}
					Share{numberOfTokensPurchasing > 1 ? "s" : ""} {" "}
					X ${_.round(listingSharePriceUsd, 2)}
				</div>
				<div>
					${(listingSharePriceUsd * numberOfTokensPurchasing).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = listingSharePriceUsd / solPriceInUSD

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
