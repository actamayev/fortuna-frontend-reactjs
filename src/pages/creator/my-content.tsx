import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import MyContentMap from "../../components/my-content/my-content-map"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import ShowMessageToNonCreators from "../../components/show-message-to-non-creators"

function MyContent() {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	if (personalInfoClass?.isApprovedToBeCreator !== true) {
		return <ShowMessageToNonCreators />
	}

	return (
		<>
			<SectionHeader siteTitle="My Content" />
			<MyContentMap />
		</>
	)
}

export default observer(MyContent)
