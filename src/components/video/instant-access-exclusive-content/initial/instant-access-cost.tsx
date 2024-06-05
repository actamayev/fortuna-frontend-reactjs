import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

interface Props {
	video: SingleVideoDataFromBackend
}

function InstantAccessCost(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(video.listingPriceToAccessUsd)) return null

	if (defaultCurrency === "usd") {
		return (
			<>
				Instant access price:
				${_.round(video.listingPriceToAccessUsd, 2)}
			</>
		)
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	const { solPriceInUSD } = solanaClass.solPriceDetails

	return (
		<>
			Instant access price: {" "}
			{_.round(video.listingPriceToAccessUsd / solPriceInUSD, 4)} SOL
		</>
	)
}

export default observer(InstantAccessCost)
