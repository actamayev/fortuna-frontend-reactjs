import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"

function WalletBalance() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	if (_.isNull(solanaClass.walletBalanceSol)) return <> Loading...</>

	return (
		<div>
			<div className="text-2xl font-bold">
				{defaultCurrency === "usd" && <>${solanaClass.walletBalanceUSD.get().toFixed(2)}</>}
				{defaultCurrency === "sol" && <>{solanaClass.walletBalanceSol.toFixed(4)} SOL</>}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Available balance
			</div>
		</div>
	)
}

export default observer(WalletBalance)
