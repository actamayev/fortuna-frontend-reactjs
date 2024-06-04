import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowInstantAccessPurchasePrice(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	const { priceToInstantlyAccessExclusiveContentUsd } = video
	if (_.isNull(priceToInstantlyAccessExclusiveContentUsd)) return null

	if (defaultCurrency === "usd") {
		return <>${(priceToInstantlyAccessExclusiveContentUsd).toFixed(2)}</>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = priceToInstantlyAccessExclusiveContentUsd / solPriceInUSD

	return <>{(videoListingSharePriceSol).toFixed(4)} SOL</>
}

export default observer(ShowInstantAccessPurchasePrice)
