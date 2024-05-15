import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"
import { useSolanaContext } from "../../../../contexts/solana-context"

function CostPerShareArea() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	if (
		_.isUndefined(videoUUID) ||
		_.isNull(personalInfoClass) ||
		_.isNull(solanaClass)
	) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<>
				Cost per share: {" "}
				${_.round(video.listingSharePriceUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass.solPriceDetails)) return null

	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
	return (
		<>
			Cost per share: {" "}
			{_.round(video.listingSharePriceUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(CostPerShareArea)
