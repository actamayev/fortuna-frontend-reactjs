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
		<div className="flex justify-center items-center border border-zinc-400 dark:border-zinc-600 rounded-full">
			<HoverOutlineComponent
				classes="flex items-center justify-center h-10 w-auto"
				onClickAction={copyToClipboard}
			>
				<div className="flex items-center mx-1 space-x-1">
					<IoIosShareAlt size={22} />
					<span className="text-xs font-medium text-zinc-950 dark:text-zinc-200">Share</span>
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
