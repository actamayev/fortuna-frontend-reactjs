import { IoIosShareAlt } from "react-icons/io"
import { useCallback, useState } from "react"
import NotificationBox from "../../notification-box"
import HoverOutlineComponent from "../../hover-outline-component"

export default function ShareVideoButton() {
	const [notification, setNotification] = useState<string | null>(null)

	const copyToClipboard = useCallback(async () => {
		try {
			const currentUrl = window.location.href
			await navigator.clipboard.writeText(currentUrl)
			setNotification("Link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [])

	return (
		<div>
			<HoverOutlineComponent
				classes="flex items-center justify-center border border-zinc-400 dark:border-zinc-600 rounded-full"
				onClickAction={copyToClipboard}
			>
				<div className="mx-2">
					<IoIosShareAlt size={22} />
				</div>
			</HoverOutlineComponent>
			{notification && (
				<NotificationBox
					message={notification}
					onClose={() => setNotification(null)}
				/>
			)}
		</div>
	)
}
