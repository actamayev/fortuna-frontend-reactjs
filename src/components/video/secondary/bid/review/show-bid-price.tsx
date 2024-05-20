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

	const bidPricePerShareUsd = exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd
	const numberOfSharesBiddingFor = exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					{numberOfSharesBiddingFor} {" "}
					Share{numberOfSharesBiddingFor > 1 ? "s" : ""} {" "}
					X ${_.round(bidPricePerShareUsd, 2)}
				</div>
				<div>
					${(bidPricePerShareUsd * numberOfSharesBiddingFor).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = bidPricePerShareUsd / solPriceInUSD

	return (
		<div className="flex justify-between">
			<div>
				{numberOfSharesBiddingFor} {" "}
				Share{numberOfSharesBiddingFor > 1 ? "s" : ""} {" "}
				X {_.round(videoListingSharePriceSol, 4)} SOL
			</div>
			<div>
				{(videoListingSharePriceSol * numberOfSharesBiddingFor).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowBidPrice)
