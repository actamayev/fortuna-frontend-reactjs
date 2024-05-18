import _ from "lodash"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowProfilePicture() {
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass) || _.isNil(personalInfoClass.profilePictureUrl)) return null

	return (
		<img
			width="140"
			src={personalInfoClass.profilePictureUrl}
			className="rounded-lg"
		/>
	)
}

export default observer(ShowProfilePicture)
