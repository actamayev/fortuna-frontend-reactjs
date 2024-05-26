import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function CostPerShareArea(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<>
				Cost per share: {" "}
				${_.round(video.listingSharePriceUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
	return (
		<>
			Cost per share: {" "}
			{_.round(video.listingSharePriceUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(CostPerShareArea)
