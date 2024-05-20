import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import Transactions from "../components/my-wallet/transactions/transactions"
import WalletDetails from "../components/my-wallet/wallet-balance-details/wallet-details"

function MyWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-wallet" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Wallet" />
			<WalletDetails />
			<Transactions />
		</>
	)
}

export default observer(MyWallet)
