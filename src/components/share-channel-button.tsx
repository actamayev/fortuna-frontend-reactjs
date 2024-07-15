import _ from "lodash"
import { observer } from "mobx-react"
import { MdIosShare } from "react-icons/md"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import HoverOutlineComponent from "./hover-outline-component"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import { useNotificationsContext } from "../contexts/notifications-context"

function ShareChannelButton() {
	const location = useLocation()
	const personalInfoClass = usePersonalInfoContext()
	const notificationsClass = useNotificationsContext()

	const creatorUsernameUrl = useMemo(() => {
		const { protocol, hostname, port } = window.location
		const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`
		if (location.pathname === "/creator/studio") {
			if (_.isNull(personalInfoClass)) return ""
			return (`${baseUrl}/c/@${personalInfoClass.username}`)
		}
		return window.location.href
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname, personalInfoClass?.username])

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(creatorUsernameUrl)
			notificationsClass.setNeutralNotification("Channel link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [creatorUsernameUrl, notificationsClass])

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center text-black dark:text-white"
			onClickAction={copyToClipboard}
			circlePixelSize="35px"
		>
			<MdIosShare size={24}/>
		</HoverOutlineComponent>
	)
}

export default observer(ShareChannelButton)
