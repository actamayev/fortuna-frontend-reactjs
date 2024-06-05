import _ from "lodash"
import { observer } from "mobx-react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"

function CreateContentHeaderButton() {
	const location = useLocation()
	const authClass = useAuthContext()

	if (
		_.isNull(authClass.accessToken) ||
		location.pathname.startsWith("/creator/upload-content")
	) return null

	return (
		<div className="inline-flex items-center justify-center flex-grow flex-shrink mx-2">
			<Link
				to="/creator/upload-content"
				className="text-center font-semibold w-full"
			>
				<div
					className="rounded text-white dark:text-zinc-950 px-3 h-9 \
						space-x-2 flex text-sm items-center justify-center bg-blue-500 hover:bg-blue-600 \
						dark:bg-blue-400 dark:hover:bg-blue-500"
				>
					<div>+</div>
					<div>Create</div>
				</div>
			</Link>
		</div>
	)
}

export default observer(CreateContentHeaderButton)
