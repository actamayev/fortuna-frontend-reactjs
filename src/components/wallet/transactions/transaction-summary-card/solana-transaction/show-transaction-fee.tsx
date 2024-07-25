import _ from "lodash"
import ShowProvidedUsdOrSolPrice from "../../../../usd-or-sol/show-provided-usd-or-sol-price"

interface Props {
	solanaTransaction: SolanaTransaction
}

export default function ShowTransactionFee(props: Props) {
	const { solanaTransaction } = props

	if (
		solanaTransaction.depositOrWithdrawal === "deposit" ||
		_.isUndefined(solanaTransaction.withdrawalFeeSol) ||
		_.isUndefined(solanaTransaction.withdrawalFeeUsd)
	) {
		return (
			<>
				<ShowProvidedUsdOrSolPrice
					usdPriceToDisplay={0}
					solPriceToDisplay={0}
					roundOrFixed="fixed"
				/>&nbsp;(internal transfer)
			</>
		)
	}

	return (
		<ShowProvidedUsdOrSolPrice
			usdPriceToDisplay={solanaTransaction.withdrawalFeeUsd}
			solPriceToDisplay={solanaTransaction.withdrawalFeeSol}
			solPriceRoundTo={6}
			usdPriceRoundTo={5}
			roundOrFixed="fixed"
		/>
	)
}
