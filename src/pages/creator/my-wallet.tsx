import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthContentToNullCreator from "../../components/show-auth-content-to-null-creator"

function MyWallet() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthContentToNullCreator whereToNavigate="/creator/my-wallet" />
	}

	return (
		<>
			My Wallet
		</>
	)
}

export default observer(MyWallet)
