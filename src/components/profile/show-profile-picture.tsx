import _ from "lodash"
import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { FaUserCircle } from "react-icons/fa"

function ShowProfilePicture() {
	const personalInfoClass = usePersonalInfoContext()

	const handleChangePicture = () => {
		// Logic to change the picture
	}

	if (_.isNull(personalInfoClass)) return null

	return (
		<div className="relative inline-block">
			{personalInfoClass.profilePictureUrl ? (
				<img
					src={personalInfoClass.profilePictureUrl || ""}
					className="rounded-full w-36 h-36 object-cover cursor-pointer"
					onClick={handleChangePicture}
				/>
			) : (
				<FaUserCircle
					className="w-36 h-36 rounded-full mr-2 object-cover cursor-pointer"
					onClick={handleChangePicture}
				/>
			)}
			<div className="absolute top-3 right-3 bg-gray-500 p-1 rounded-full cursor-pointer">
				<RiPencilFill color="white" size={22}/>
			</div>
		</div>
	)
}

export default observer(ShowProfilePicture)
