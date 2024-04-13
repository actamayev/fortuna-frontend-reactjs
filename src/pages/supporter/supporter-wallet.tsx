import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SupporterHeader from "../../components/supporter-header"
import WalletDetails from "../../components/wallet/wallet-details"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import Transactions from "../../components/wallet/transactions/transactions"

function SupporterWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-wallet" />
	}

	return (
		<>
			<SupporterHeader />
			<WalletDetails />
			<Transactions />
		</>
	)
}

export default observer(SupporterWallet)
