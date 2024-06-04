import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

interface Props {
	video: SingleVideoDataFromBackend
}

function CostPerShareArea(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (defaultCurrency === "usd") {
		return (
			<>
				Cost per share: {" "}
				${_.round(video.listingSharePriceUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	const { solPriceInUSD } = solanaClass.solPriceDetails

	return (
		<>
			Cost per share: {" "}
			{_.round(video.listingSharePriceUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(CostPerShareArea)
