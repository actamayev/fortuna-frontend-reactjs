import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

function PricePerShareArea(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || personalInfoClass.defaultCurrency === "usd") {
		return <>${_.round(video.listingSharePriceUsd, 2)}/Share</>
	}
	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
	return <>{_.round(video.listingSharePriceUsd / solPriceInUSD, 4)} SOL/Share</>
}

export default observer(PricePerShareArea)
