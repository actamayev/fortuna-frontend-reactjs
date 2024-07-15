import { useCallback } from "react"
import { observer } from "mobx-react"
import { MdIosShare } from "react-icons/md"
import HoverOutlineComponent from "../../hover-outline-component"
import { useNotificationsContext } from "../../../contexts/notifications-context"

function ShareVideoButton() {
	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			const currentUrl = window.location.href
			await navigator.clipboard.writeText(currentUrl)
			notificationsClass.setNeutralNotification("Link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [notificationsClass])

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={copyToClipboard}
		>
			<MdIosShare size={22} className="mx-2"/>
		</HoverOutlineComponent>
	)
}

export default observer(ShareVideoButton)
