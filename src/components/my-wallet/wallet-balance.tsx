import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function WalletBalance() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			{_.isNull(solanaClass.walletBalanceSol) ? (<> Loading...</>) : (
				<> {" "}
					{personalInfoClass.defaultCurrency === "usd" && (<>${(solanaClass.walletBalanceUSD.get()).toFixed(2)}</>)}
					{personalInfoClass.defaultCurrency === "sol" && (<>{(solanaClass.walletBalanceSol || 0).toFixed(4)} SOL</>)}
				</>
			)}
		</>
	)
}

export default observer(WalletBalance)
