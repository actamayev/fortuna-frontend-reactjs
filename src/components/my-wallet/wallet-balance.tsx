import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"

function WalletBalance() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			{_.isNull(solanaClass.walletBalanceSol) ? (<> Loading...</>) : (
				<> {" "}
					{defaultCurrency === "usd" && (<>${solanaClass.walletBalanceUSD.get().toFixed(2)}</>)}
					{defaultCurrency === "sol" && (<>{solanaClass.walletBalanceSol.toFixed(4)} SOL</>)}
				</>
			)}
		</>
	)
}

export default observer(WalletBalance)
