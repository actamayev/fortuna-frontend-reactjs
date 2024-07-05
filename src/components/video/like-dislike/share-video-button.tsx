import { useCallback } from "react"
import { observer } from "mobx-react"
import { IoIosShareAlt } from "react-icons/io"
import HoverOutlineComponent from "../../hover-outline-component"
import { useNotificationsContext } from "../../../contexts/notifications-context"

function ShareVideoButton() {
	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			const currentUrl = window.location.href
			await navigator.clipboard.writeText(currentUrl)
			notificationsClass.setNotification("Link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [notificationsClass])

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center border border-zinc-400 dark:border-zinc-600 rounded-full"
			onClickAction={copyToClipboard}
		>
			<div className="mx-2">
				<IoIosShareAlt size={22} />
			</div>
		</HoverOutlineComponent>
	)
}

export default observer(ShareVideoButton)
