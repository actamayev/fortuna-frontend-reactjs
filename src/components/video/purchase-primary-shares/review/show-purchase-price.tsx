import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"

interface Props {
	video: VideoData
}

function ShowPurchasePrice(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNull(exchangeClass)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					${_.round(video.listingSharePriceUsd, 2)} X {exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing} Shares
				</div>
				<div>
					${_.round(video.listingSharePriceUsd * exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = video.listingSharePriceUsd / solPriceInUSD
	return (
		<div className="flex justify-between">
			<div>
				{_.round(videoListingSharePriceSol, 4)} SOL X {exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing} Shares
			</div>
			<div>
				{_.round(videoListingSharePriceSol * exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 4).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowPurchasePrice)
