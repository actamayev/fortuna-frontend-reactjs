import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import ShowNumberSharesPurchasing from "./show-number-shares-purchasing"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

function ShowPurchasePrice(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	if (video.listingDefaultCurrency === "sol") {
		if (personalInfoClass.defaultCurrency === "sol") {
			return (
				<>
					<ShowNumberSharesPurchasing />
					{_.round(video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 4)} SOL
					({_.round(video.listingSharePrice, 4)} SOL/share)
				</>
			)
		}
		const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPriceInUSD)) return null
		return (
			<>
				<ShowNumberSharesPurchasing />
				${_.round(video.listingSharePrice * solPriceInUSD * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2)} {" "}
				(${_.round(video.listingSharePrice * solPriceInUSD, 2)}/share)
			</>
		)
	} else {
		if (personalInfoClass.defaultCurrency === "usd") {
			return (
				<>
					<ShowNumberSharesPurchasing />
					${_.round(video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing, 2)} {" "}
					(${_.round(video.listingSharePrice, 2)}/share)
				</>
			)
		}
		const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPriceInUSD)) return null
		return (
			<>
				<ShowNumberSharesPurchasing />
				{_.round((video.listingSharePrice * solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing) / solPriceInUSD, 4)} SOL
				({_.round(video.listingSharePrice / solPriceInUSD, 4)} SOL/share)
			</>
		)
	}
}

export default observer(ShowPurchasePrice)
