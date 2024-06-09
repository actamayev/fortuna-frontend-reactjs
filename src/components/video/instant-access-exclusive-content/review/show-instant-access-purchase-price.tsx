import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

interface Props {
	listingPriceToAccessUsd: number | null
}

function ShowInstantAccessPurchasePrice(props: Props) {
	const { listingPriceToAccessUsd } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(listingPriceToAccessUsd)) return null

	if (defaultCurrency === "usd") {
		return <div>${(listingPriceToAccessUsd).toFixed(2)}</div>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const listingPriceToAccessSol = listingPriceToAccessUsd / solPriceInUSD

	return <div>{(listingPriceToAccessSol).toFixed(4)} SOL</div>
}

export default observer(ShowInstantAccessPurchasePrice)
