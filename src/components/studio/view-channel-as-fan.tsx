import { observer } from "mobx-react"
import { FaEye } from "react-icons/fa"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import HoverOutlineComponent from "../hover-outline-component"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ViewChannelAsFan() {
	const location = useLocation()
	const personalInfoClass = usePersonalInfoContext()

	const creatorUsernameUrl = useMemo(() => {
		const { protocol, hostname, port } = window.location
		const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`
		if (location.pathname === "/creator/studio") {
			return (`${baseUrl}/c/@${personalInfoClass.username || ""}`)
		}
		return window.location.href
	}, [location.pathname, personalInfoClass.username])

	const openNewCreatorTab = useCallback(() => {
		window.open(creatorUsernameUrl, "_blank", "noopener,noreferrer")
	}, [creatorUsernameUrl])

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center text-black dark:text-white"
			onClickAction={openNewCreatorTab}
			circlePixelSize="35px"
		>
			<FaEye size={24}/>
		</HoverOutlineComponent>
	)
}

export default observer(ViewChannelAsFan)
