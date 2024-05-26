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

	if (_.isNull(personalInfoClass) || _.isNull(video.listingPriceToAccessContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return <>${(video.listingPriceToAccessContentUsd).toFixed(2)}</>
	}

	if (_.isNull(solanaClass)) return null
	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = video.listingPriceToAccessContentUsd / solPriceInUSD

	return <>{(videoListingSharePriceSol).toFixed(4)} SOL</>
}

export default observer(ShowInstantAccessPurchasePrice)
