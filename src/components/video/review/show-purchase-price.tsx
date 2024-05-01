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
					Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for {" "}
					{_.round(video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 4)} SOL
					({_.round(video.listingSharePrice, 4)}SOL/Share)
				</>
			)
		}
		const solanaPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solanaPrice)) return null
		return (
			<>
				Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for {" "}
				${_.round(video.listingSharePrice * solanaPrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2)} {" "}
				(${_.round(video.listingSharePrice * solanaPrice, 2)}/Share)
			</>
		)
	} else {
		if (personalInfoClass.getDefaultCurrency() === "usd") {
			return (
				<>
					Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for {" "}
					${_.round(video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2)} {" "}
					(${_.round(video.listingSharePrice, 2)}/Share)
				</>
			)
		}
		const solanaPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solanaPrice)) return null
		return (
			<>
				Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for {" "}
				{_.round((video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing) / solanaPrice, 4)} SOL
				({_.round(video.listingSharePrice / solanaPrice, 4)}SOL/Share)
			</>
		)
	}
}

export default observer(ShowPurchasePrice)
