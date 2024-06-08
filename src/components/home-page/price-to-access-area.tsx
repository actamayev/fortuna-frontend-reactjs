import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: SingleVideoDataFromBackend
}

function PriceToAccessArea(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
	if (_.isNull(tierAccessPriceUsd)) return null
	if (defaultCurrency === "usd") {
		return (
			<>
				${_.round(tierAccessPriceUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const solPriceInUSD = solanaClass.solPriceDetails.solPriceInUSD

	return (
		<>
			{_.round(tierAccessPriceUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(PriceToAccessArea)
