import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../contexts/solana-context"
import useDefaultCurrency from "../hooks/memos/default-currency"

interface Props {
	usdAmount: number | null
}

function ShowUSDOrSolPrice(props: Props) {
	const { usdAmount } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(usdAmount)) return null

	if (defaultCurrency === "usd") {
		return <>${_.round(usdAmount, 2)}</>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const listingPriceToAccessSol = usdAmount / solPriceInUSD

	return <>{_.round(listingPriceToAccessSol, 4)} SOL</>
}

export default observer(ShowUSDOrSolPrice)
