import { observer } from "mobx-react"
import useDefaultCurrency from "../../hooks/memos/default-currency"

interface Props {
	solPriceToDisplay: React.ReactNode
	usdPriceToDisplay: React.ReactNode
}

// TODO: Consider also passing in round or fixed. if round, use number with commas rounded, fix fixed
// This should be done to not have to pass in JSX
function ShowProvidedUsdOrSolPrice(props: Props) {
	const { solPriceToDisplay, usdPriceToDisplay } = props
	const defaultCurrency = useDefaultCurrency()

	if (defaultCurrency === "usd") return usdPriceToDisplay
	return solPriceToDisplay
}

export default observer(ShowProvidedUsdOrSolPrice)
