import _ from "lodash"
import { observer } from "mobx-react"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import Wallet from "../../components/login-and-registration-form/wallet"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"

function CreatorWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-wallet" />
	}

	return (
		<>
			<CreatorHeader />
			<Wallet />
		</>
	)
}

export default observer(CreatorWallet)
