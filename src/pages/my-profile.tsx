import { observer } from "mobx-react"
import UploadProfilePicture from "../components/profile/upload-profile-picture"

function MyProfile() {
	return <UploadProfilePicture />
}

export default observer(MyProfile)
