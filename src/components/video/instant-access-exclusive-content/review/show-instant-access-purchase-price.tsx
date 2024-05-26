import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function ShowInstantAccessPurchasePrice(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null

	if (_.isNull(video.listingPriceToAccessContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>
					Instant Access Price:
				</div>
				<div>
					${(video.listingPriceToAccessContentUsd).toFixed(2)}
				</div>
			</div>
		)
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = video.listingPriceToAccessContentUsd / solPriceInUSD

	return (
		<div className="flex justify-between">
			<div>
				Instant Access Price:
			</div>
			<div>
				{(videoListingSharePriceSol).toFixed(4)} SOL
			</div>
		</div>
	)
}

export default observer(ShowInstantAccessPurchasePrice)
