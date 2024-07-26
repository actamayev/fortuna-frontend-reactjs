import { useCallback } from "react"
import { observer } from "mobx-react"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import { SuperMoneyStyleDollars, SuperMoneyStyleSol } from "./super-money-style"
import { useNumberWithCommasFixed, useNumberWithCommasRounded } from "../../hooks/numbers/numbers-with-commas"

interface Props {
	solPriceToDisplay: number
	usdPriceToDisplay: number
	roundOrFixed: RoundOrFixed
	solPriceRoundTo?: number
	usdPriceRoundTo?: number
	extraStyles?: string
}

function ShowProvidedUsdOrSolPrice(props: Props) {
	const { solPriceToDisplay, usdPriceToDisplay, roundOrFixed, solPriceRoundTo = 4, usdPriceRoundTo = 2, extraStyles } = props
	const defaultCurrency = useDefaultCurrency()
	const numberWithCommasFixed = useNumberWithCommasFixed()
	const numberWithCommasRounded = useNumberWithCommasRounded()

	const formatPrice = useCallback((price: number, digits: number) => {
		return roundOrFixed === "fixed" ? numberWithCommasFixed(price, digits) : numberWithCommasRounded(price)
	}, [numberWithCommasFixed, numberWithCommasRounded, roundOrFixed])

	if (defaultCurrency === "usd") {
		const { dollars, cents } = formatPrice(usdPriceToDisplay, usdPriceRoundTo)
		return (
			<SuperMoneyStyleDollars
				dollars={dollars}
				cents={cents}
				extraStyles={extraStyles}
			/>
		)
	}

	const { dollars, cents } = formatPrice(solPriceToDisplay, solPriceRoundTo)
	return (
		<SuperMoneyStyleSol
			dollars={dollars}
			cents={cents}
			extraStyles={extraStyles}
		/>
	)
}

export default observer(ShowProvidedUsdOrSolPrice)
