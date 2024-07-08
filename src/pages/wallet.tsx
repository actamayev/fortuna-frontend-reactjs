import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import Transactions from "../components/wallet/transactions/transactions-map"
import WalletDetails from "../components/wallet/wallet-balance-details/wallet-details"

function Wallet() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/wallet" />
	}

	return (
		<>
			<WalletDetails />
			<Transactions />
		</>
	)
}

export default observer(Wallet)
