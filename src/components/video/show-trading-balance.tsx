import _ from "lodash"
import { observer } from "mobx-react"
import WalletBalance from "../my-wallet/wallet-balance"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowTradingBalance() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			Trading balance: <WalletBalance />
		</>
	)
}

export default observer(ShowTradingBalance)
