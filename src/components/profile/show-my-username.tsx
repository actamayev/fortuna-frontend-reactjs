import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowMyUsername() {
	const personalInfoClass = usePersonalInfoContext()

	const username = useMemo(() => {
		return personalInfoClass?.username || ""
	}, [personalInfoClass?.username])

	return (
		<div className="text-center dark:text-zinc-100 text-md font-semibold">
			@{username}
		</div>
	)
}

export default observer(ShowMyUsername)
