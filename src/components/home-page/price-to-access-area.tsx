import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"

interface Props {
	video: SingleVideoDataFromBackend
}

function PriceToAccessArea(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (defaultCurrency === "usd") {
		return (
			<>
				${_.round(video.listingPriceToAccessUsd, 2)}/Share
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD

	return (
		<>
			{_.round(video.listingPriceToAccessUsd / solPriceInUSD, 4)} SOL/Share
		</>
	)
}

export default observer(PriceToAccessArea)
