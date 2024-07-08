import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function ShowMyUsername() {
	const personalInfoClass = usePersonalInfoContext()

	const username = useMemo(() => {
		return personalInfoClass?.username || ""
	}, [personalInfoClass?.username])

	return (
		<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
			@{username}
		</div>
	)
}

export default observer(ShowMyUsername)
