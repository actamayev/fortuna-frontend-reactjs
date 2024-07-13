import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import Transactions from "../components/wallet/transactions/transactions-map"
import WalletSummaryCard from "../components/wallet/wallet-summary-card/wallet-balance-card"

function Wallet() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/wallet" />
	}

	return (
		<>
			<WalletSummaryCard />
			<Transactions />
		</>
	)
}

export default observer(Wallet)
