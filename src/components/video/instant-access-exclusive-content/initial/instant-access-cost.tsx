import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

// ASAP TODO: Display somewhere how many shares the user currently has, and how many they need to access the content instantly
interface Props {
	video: VideoDataWithVideoUrl
}

function InstantAccessCost(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null
	if (_.isNull(video.listingPriceToAccessContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<>
				Instant access price:
				${_.round(video.listingPriceToAccessContentUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD

	return (
		<>
			Instant access price: {" "}
			{_.round(video.listingPriceToAccessContentUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(InstantAccessCost)
