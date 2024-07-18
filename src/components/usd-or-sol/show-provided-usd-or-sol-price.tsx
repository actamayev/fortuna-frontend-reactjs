import { observer } from "mobx-react"
import useDefaultCurrency from "../../hooks/memos/default-currency"
import { numberWithCommasFixed, numberWithCommasRounded } from "../../utils/numbers-with-commas"

interface Props {
	solPriceToDisplay: number
	usdPriceToDisplay: number
	roundOrFixed: RoundOrFixed
}

function ShowProvidedUsdOrSolPrice(props: Props) {
	const { solPriceToDisplay, usdPriceToDisplay, roundOrFixed } = props
	const defaultCurrency = useDefaultCurrency()

	if (defaultCurrency === "usd") {
		if (roundOrFixed === "fixed") {
			return (
				<>${numberWithCommasFixed(usdPriceToDisplay, 2)}</>
			)
		}

		return (
			<>${numberWithCommasRounded(usdPriceToDisplay)}</>
		)
	}

	if (roundOrFixed === "fixed") {
		return (
			<>{numberWithCommasFixed(solPriceToDisplay, 4)} SOL</>
		)
	}

	return (
		<>{numberWithCommasRounded(usdPriceToDisplay)} SOL</>
	)
}

export default observer(ShowProvidedUsdOrSolPrice)
