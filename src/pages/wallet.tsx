import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useAuthContext } from "../contexts/auth-context"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import TransactionsMap from "../components/wallet/transactions/transactions-map"
import WalletSummaryCard from "../components/wallet/wallet-summary-card/wallet-balance-card"

function Wallet() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/wallet" />
				<ShowAuthToNullUser whereToNavigate="/wallet" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/wallet" />
			<WalletSummaryCard />
			<TransactionsMap />
		</>
	)
}

export default observer(Wallet)
