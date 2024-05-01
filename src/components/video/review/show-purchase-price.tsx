import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

function ShowPurchasePrice(props: Props) {
	const { video } = props
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	if (video.listingDefaultCurrency === "sol") {
		if (personalInfoClass.getDefaultCurrency() === "sol") {
			return (
				<>
					Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for
					{video.listingSharePrice} SOL
				</>
			)
		}
		const solanaPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solanaPrice)) return null
		return (
			<>
				Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for
				${video.listingSharePrice * solanaPrice}
			</>
		)
	} else {
		if (personalInfoClass.getDefaultCurrency() === "usd") {
			return (
				<>
					Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for
					${video.listingSharePrice}
				</>
			)
		}
		const solanaPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solanaPrice)) return null
		return (
			<>
				Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for
				{video.listingSharePrice / solanaPrice} SOL
			</>
		)
	}
}

export default observer(ShowPurchasePrice)
