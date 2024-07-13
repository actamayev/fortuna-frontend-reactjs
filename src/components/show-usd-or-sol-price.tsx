import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../contexts/solana-context"
import useDefaultCurrency from "../hooks/memos/default-currency"
import { numberWithCommasFixed, numberWithCommasRounded } from "../utils/numbers-with-commas"

interface Props {
	usdAmount: number | null
	roundOrFixed: "round" | "fixed"
}
function ShowUSDOrSolPrice(props: Props) {
	const { usdAmount, roundOrFixed } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(usdAmount)) return null

	if (defaultCurrency === "usd") {
		if (roundOrFixed === "fixed") {
			return <>${numberWithCommasFixed(usdAmount, 2)}</>
		}

		return <>${numberWithCommasRounded(usdAmount)}</>
	}

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const listingPriceToAccessSol = usdAmount / solPriceInUSD

	if (roundOrFixed === "fixed") {
		return <>{numberWithCommasFixed(listingPriceToAccessSol, 4)} SOL</>
	}

	return <>{numberWithCommasRounded(listingPriceToAccessSol)} SOL</>
}

export default observer(ShowUSDOrSolPrice)
