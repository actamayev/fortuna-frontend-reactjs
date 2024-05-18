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
					{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor} {" "}
					Share{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor > 1 ? "s" : ""} {" "}
					X ${_.round(exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd, 2)}
				</div>
				<div>
					${(exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd * exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor).toFixed(2)}
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
				{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor} {" "}
				Share{exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor > 1 ? "s" : ""} {" "}
				X {_.round(videoListingSharePriceSol, 4)} SOL
			</div>
			<div>
				{(videoListingSharePriceSol * exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowBidPrice)
