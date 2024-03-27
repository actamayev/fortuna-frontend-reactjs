import _ from "lodash"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthContentToNullCreator from "../../components/show-auth-content-to-null-creator"
import { observer } from "mobx-react"

function MyContent() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthContentToNullCreator whereToNavigate="/creator/my-content" />
	}

	return (
		<>
			MyContent
		</>
	)
}

export default observer(MyContent)
