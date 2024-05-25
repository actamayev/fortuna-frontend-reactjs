import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function InstantAccessCost() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video) || _.isNull(video.listingPriceToAccessContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<>
				Instant access cost:
				${_.round(video.listingPriceToAccessContentUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
	return (
		<>
			Instant access cost: {" "}
			{_.round(video.listingPriceToAccessContentUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(InstantAccessCost)
