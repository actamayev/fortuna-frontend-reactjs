import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

// eslint-disable-next-line complexity
function PricePerShareArea(props: Props) {
	const { video } = props
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	if (_.isNull(personalInfoClass)) {
		if (video.listingDefaultCurrency === "usd") {
			return <>${_.round(video.listingSharePrice, 2)}/Share</>
		} else {
			return <>{_.round(video.listingSharePrice, 4)} SOL/Share</>
		}
	}
	if (personalInfoClass.getDefaultCurrency() === "sol") {
		if (video.listingDefaultCurrency === "sol") {
			return <>{_.round(video.listingSharePrice, 4)} SOL/Share</>
		}
		if (_.isNull(solanaClass)) return null
		const solPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPrice)) return null
		return <>{_.round(video.listingSharePrice / solPrice, 4)} SOL/Share</>
	} else {
		if (video.listingDefaultCurrency === "usd") {
			return <>${_.round(video.listingSharePrice, 2)}/Share</>
		}
		if (_.isNull(solanaClass)) return null
		const solPrice = solanaClass.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPrice)) return null
		return <>${_.round(video.listingSharePrice * solPrice, 2)}/Share</>
	}
}

export default observer(PricePerShareArea)
