import _ from "lodash"
import { observer } from "mobx-react"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import WalletDetails from "../../components/wallet/wallet-details"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import Transactions from "../../components/wallet/transactions/transactions"

function CreatorWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-wallet" />
	}

	return (
		<>
			<CreatorHeader />
			<WalletDetails />
			<Transactions />
		</>
	)
}

export default observer(CreatorWallet)
