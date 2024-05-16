/* eslint-disable max-len */
import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"

function ShowBidPrice() {
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNull(exchangeClass)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					${_.round(exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd, 2)} X {exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor} Share{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor > 1 ? "s" : ""}
				</div>
				<div>
					${_.round(exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd * exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor, 2).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd / solPriceInUSD
	return (
		<div className="flex justify-between">
			<div>
				{_.round(videoListingSharePriceSol, 4)} SOL X {exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor} Share{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor > 1 ? "s" : ""}
			</div>
			<div>
				{_.round(videoListingSharePriceSol * exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor, 4).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowBidPrice)
