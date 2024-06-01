import _ from "lodash"
import { observer } from "mobx-react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function CreateContentHeaderButton() {
	const location = useLocation()
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()

	if (
		_.isNull(authClass.accessToken) ||
		personalInfoClass?.isApprovedToBeCreator !== true ||
		location.pathname.startsWith("/creator/upload-content")
	) return null

	return (
		<div className="inline-flex items-center justify-center flex-grow flex-shrink mr-2">
			<Link
				to="/creator/upload-content"
				className="text-center w-full"
			>
				<div
					className={"rounded text-white dark:text-zinc-900 pl-3 pr-3 h-9 \
						space-x-2 flex text-sm items-center justify-center bg-blue-600 hover:bg-blue-700" }
				>
					<div>
						+
					</div>
					<div>
						Create
					</div>
				</div>
			</Link>
		</div>
	)
}

export default observer(CreateContentHeaderButton)
