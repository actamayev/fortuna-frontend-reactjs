import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowProfilePicture() {
	const personalInfoClass = usePersonalInfoContext()

	return (
		<img
			width="140"
			src={personalInfoClass?.profilePictureUrl || ""}
			className="rounded-lg"
		/>
	)
}

export default observer(ShowProfilePicture)
