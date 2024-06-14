import { FaShare } from "react-icons/fa"
import { useCallback, useState } from "react"
import NotificationBox from "../../notification-box"
import HoverOutlineComponent from "../../hover-outline-component"

export default function ShareVideoSection() {
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
				classes="flex items-center justify-center"
				onClickAction={copyToClipboard}
			>
				<FaShare size={20}/>
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
