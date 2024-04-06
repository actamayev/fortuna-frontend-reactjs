import _ from "lodash"
import { observer } from "mobx-react"
import WalletDetails from "../../components/wallet/wallet-details"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"

function CreatorWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-wallet" />
	}

	return (
		<>
			<CreatorHeader />
			<WalletDetails />
		</>
	)
}

export default observer(CreatorWallet)
