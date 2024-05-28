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

	const { instantAccessPriceToExclusiveContentUsd } = video
	if (_.isNull(personalInfoClass) || _.isNull(instantAccessPriceToExclusiveContentUsd)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		return <>${(instantAccessPriceToExclusiveContentUsd).toFixed(2)}</>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = instantAccessPriceToExclusiveContentUsd / solPriceInUSD

	return <>{(videoListingSharePriceSol).toFixed(4)} SOL</>
}

export default observer(ShowInstantAccessPurchasePrice)
