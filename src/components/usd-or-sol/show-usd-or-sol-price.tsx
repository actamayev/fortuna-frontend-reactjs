import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "./super-money-style"
import { numberWithCommasFixed, numberWithCommasRounded } from "../../utils/numbers-with-commas"

interface Props {
	usdAmount: number | null
	roundOrFixed: RoundOrFixed
}

function ShowUSDOrSolPrice(props: Props) {
	const { usdAmount, roundOrFixed } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	const formatPrice = useCallback((price: number, digits: number) => {
		return roundOrFixed === "fixed" ? numberWithCommasFixed(price, digits) : numberWithCommasRounded(price)
	}, [roundOrFixed])

	if (_.isNull(usdAmount)) return null

	if (defaultCurrency === "usd") {
		const { dollars, cents } = formatPrice(usdAmount, 2)

		return (
			<SuperMoneyStyleDollars dollars={dollars} cents={cents} />
		)
	}

	if (_.isNull(solanaClass.solPriceDetails)) return null
	const { solPriceInUSD } = solanaClass.solPriceDetails
	if (_.isUndefined(solPriceInUSD)) return null
	const listingPriceToAccessSol = usdAmount / solPriceInUSD

	const { dollars, cents } = formatPrice(listingPriceToAccessSol, 4)

	return (
		<SuperMoneyStyleSol dollars={dollars} cents={cents} />
	)

}

export default observer(ShowUSDOrSolPrice)
