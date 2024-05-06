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

	if (_.isNull(personalInfoClass)) {
		if (video.listingDefaultCurrency === "usd") {
			return <>${_.round(video.listingSharePrice, 2)}/Share</>
		} else {
			return <>{_.round(video.listingSharePrice, 4)} SOL/Share</>
		}
	}
	if (personalInfoClass.defaultCurrency === "sol") {
		if (video.listingDefaultCurrency === "sol") {
			return <>{_.round(video.listingSharePrice, 4)} SOL/Share</>
		}
		if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
		const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
		return <>{_.round(video.listingSharePrice / solPriceInUSD, 4)} SOL/Share</>
	} else {
		if (video.listingDefaultCurrency === "usd") {
			return <>${_.round(video.listingSharePrice, 2)}/Share</>
		}
		if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
		const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD
		return <>${_.round(video.listingSharePrice * solPriceInUSD, 2)}/Share</>
	}
}

export default observer(PricePerShareArea)
