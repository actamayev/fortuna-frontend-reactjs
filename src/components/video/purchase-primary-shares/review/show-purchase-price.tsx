import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import ShowNumberSharesPurchasing from "./show-number-shares-purchasing"
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
			<>
				<ShowNumberSharesPurchasing />
					${_.round(video.listingSharePriceUsd * exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2)} {" "}
					(${_.round(video.listingSharePriceUsd, 2)}/share)
			</>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return (
		<>
			<ShowNumberSharesPurchasing />
			{_.round((video.listingSharePriceUsd * exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing) / solPriceInUSD, 4)} SOL
				({_.round(video.listingSharePriceUsd / solPriceInUSD, 4)} SOL/share)
		</>
	)
}

export default observer(ShowPurchasePrice)
