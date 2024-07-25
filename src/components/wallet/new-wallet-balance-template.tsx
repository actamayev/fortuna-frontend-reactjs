import _ from "lodash"
import ShowProvidedUsdOrSolPrice from "../usd-or-sol/show-provided-usd-or-sol-price"

interface Props {
	newWalletBalanceSol: number | null
	newWalletBalanceUsd: number | null
}

export default function NewWalletBalanceTemplate(props: Props) {
	const { newWalletBalanceSol, newWalletBalanceUsd } = props

	if (_.isNull(newWalletBalanceSol) || _.isNull(newWalletBalanceUsd)) {
		return <>--</>
	}

	return (
		<div>
			<ShowProvidedUsdOrSolPrice
				solPriceToDisplay={newWalletBalanceSol}
				usdPriceToDisplay={newWalletBalanceUsd}
				roundOrFixed="fixed"
			/>
		</div>
	)
}
