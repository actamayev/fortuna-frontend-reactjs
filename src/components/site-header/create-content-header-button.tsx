import _ from "lodash"
import { observer } from "mobx-react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function CreateContentHeaderButton() {
	const location = useLocation()
	const isActive = location.pathname.startsWith("/creator/upload-content")
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(authClass.accessToken) || personalInfoClass?.isApprovedToBeCreator !== true) return null
	let classes
	if (isActive === true) classes = "bg-blue-200 border-blue-300"
	else classes = "bg-white border-blue-200 hover:bg-blue-300"

	return (
		<div className="inline-flex items-center justify-center flex-grow flex-shrink mr-2">
			<Link
				to="/creator/upload-content"
				className="font-bold text-center w-full"
			>
				<div
					className={`rounded text-zinc-900 border px-4 transition-all duration-50 flex items-center justify-center ${classes}` }
					style={{ paddingTop: "2px", paddingBottom: "5px" }}
				>
					+
				</div>
			</Link>
		</div>
	)
}

export default observer(CreateContentHeaderButton)
