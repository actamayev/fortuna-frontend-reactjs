import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"

function ShowAskPrice() {
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNull(exchangeClass)) return null

	const askPricePerShareUsd = exchangeClass.askForSplSharesDetails.askPricePerShareUsd
	const numberofSharesAskingFor = exchangeClass.askForSplSharesDetails.numberofSharesAskingFor

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					{numberofSharesAskingFor} {" "}
					Share{numberofSharesAskingFor > 1 ? "s" : ""} {" "}
					X ${_.round(askPricePerShareUsd, 2)}
				</div>
				<div>
					${(numberofSharesAskingFor * askPricePerShareUsd).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = askPricePerShareUsd / solPriceInUSD

	return (
		<div className="flex justify-between">
			<div>
				{numberofSharesAskingFor} {" "}
				Share{numberofSharesAskingFor > 1 ? "s" : ""} {" "}
				X {_.round(videoListingSharePriceSol, 4)} SOL
			</div>
			<div>
				{(videoListingSharePriceSol * numberofSharesAskingFor).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowAskPrice)
