import { useCallback } from "react"
import { observer } from "mobx-react"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "./super-money-style"
import { numberWithCommasFixed, numberWithCommasRounded } from "../../utils/numbers-with-commas"

interface Props {
	solPriceToDisplay: number
	usdPriceToDisplay: number
	roundOrFixed: RoundOrFixed
	solPriceRoundTo?: number
	usdPriceRoundTo?: number
}

function ShowProvidedUsdOrSolPrice(props: Props) {
	const { solPriceToDisplay, usdPriceToDisplay, roundOrFixed, solPriceRoundTo = 4, usdPriceRoundTo = 2 } = props
	const defaultCurrency = useDefaultCurrency()

	const formatPrice = useCallback((price: number, digits: number) => {
		return roundOrFixed === "fixed" ? numberWithCommasFixed(price, digits) : numberWithCommasRounded(price)
	}, [roundOrFixed])

	if (defaultCurrency === "usd") {
		const { dollars, cents } = formatPrice(usdPriceToDisplay, usdPriceRoundTo)
		return (
			<SuperMoneyStyleDollars dollars={dollars} cents={cents} />
		)
	}

	const { dollars, cents } = formatPrice(solPriceToDisplay, solPriceRoundTo)
	return (
		<SuperMoneyStyleSol dollars={dollars} cents={cents} />
	)
}

export default observer(ShowProvidedUsdOrSolPrice)
