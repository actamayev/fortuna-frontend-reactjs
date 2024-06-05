import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

interface Props {
	listingPriceToAccessUsd: number
}

function ShowInstantAccessPurchasePrice(props: Props) {
	const { listingPriceToAccessUsd } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (defaultCurrency === "usd") {
		return <>${(listingPriceToAccessUsd).toFixed(2)}</>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const videoListingSharePriceSol = listingPriceToAccessUsd / solPriceInUSD

	return <>{(videoListingSharePriceSol).toFixed(4)} SOL</>
}

export default observer(ShowInstantAccessPurchasePrice)
