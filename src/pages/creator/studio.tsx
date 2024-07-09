import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MyContentMap from "../../components/studio/my-content/my-content-map"
import StudioHeader from "../../components/studio/studio-header/studio-header"

function Studio() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/creator/studio" />
	}

	return (
		<>
			<StudioHeader />
			{/* TODO: Add an 'order by' filter (order by created date, # purchases, or $earnings, ascending and descending) */}
			<MyContentMap />
		</>
	)
}

export default observer(Studio)
