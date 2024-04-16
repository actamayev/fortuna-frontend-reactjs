import _ from "lodash"
import { observer } from "mobx-react"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import MyContentMap from "../../components/my-content/my-content-map"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import useRetrieveMyContent from "../../hooks/solana/retrieve-my-content"

function MyContent() {
	const authClass = useAuthContext()
	useRetrieveMyContent()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	return (
		<>
			<CreatorHeader />
			<MyContentMap />
		</>
	)
}

export default observer(MyContent)
