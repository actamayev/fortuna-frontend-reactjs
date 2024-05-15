import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowAvailableTradingBalance() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			Trading balance: {" "}
			{personalInfoClass.defaultCurrency === "usd" && (<>${_.round(solanaClass.walletBalanceUSD.get(), 2)}</>)}
			{personalInfoClass.defaultCurrency === "sol" && (<>{_.round(solanaClass.walletBalanceSol || 0, 4)} SOL</>)}
		</>
	)
}

export default observer(ShowAvailableTradingBalance)
