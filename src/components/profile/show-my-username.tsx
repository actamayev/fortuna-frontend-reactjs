import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowMyUsername() {
	const personalInfoClass = usePersonalInfoContext()

	const username = useMemo(() => {
		return personalInfoClass?.username || ""
	}, [personalInfoClass?.username])

	return (
		<>
			@{username}
		</>
	)
}

export default observer(ShowMyUsername)
