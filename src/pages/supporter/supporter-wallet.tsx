import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SupporterHeader from "../../components/supporter-header"
import Wallet from "../../components/login-and-registration-form/wallet"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"

function SupporterWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-wallet" />
	}

	return (
		<>
			<SupporterHeader />
			<Wallet />
		</>
	)
}

export default observer(SupporterWallet)
