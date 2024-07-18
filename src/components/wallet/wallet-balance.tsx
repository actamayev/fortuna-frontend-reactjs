import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import ShowProvidedUsdOrSolPrice from "../usd-or-sol/show-provided-usd-or-sol-price"

function WalletBalance() {
	const solanaClass = useSolanaContext()

	return (
		<div>
			<div className="text-2xl font-bold">
				{_.isNil(solanaClass?.walletBalanceSol) ? (
					<> Loading...</>
				) : (

					<ShowProvidedUsdOrSolPrice
						roundOrFixed="fixed"
						solPriceToDisplay={solanaClass.walletBalanceSol}
						usdPriceToDisplay={solanaClass.walletBalanceUSD.get()}
					/>
				)}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Available balance
			</div>
		</div>
	)
}

export default observer(WalletBalance)
