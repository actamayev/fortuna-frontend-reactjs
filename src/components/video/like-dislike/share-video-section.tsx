import _ from "lodash"
import { FaShare } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useCallback, useState } from "react"
import NotificationBox from "../../notification-box"
import HoverOutlineComponent from "../../hover-outline-component"

export default function ShareVideoSection() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [notification, setNotification] = useState<string | null>(null)

	const closeNotification = useCallback(() => {
		setNotification(null)
	}, [])

	const copyToClipboard = useCallback(async () => {
		try {
			if (_.isUndefined(videoUUID)) return
			await navigator.clipboard.writeText(`https://www.mintfortuna.com/v/${videoUUID}`)
			setNotification("Link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [videoUUID])

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
					onClose={closeNotification}
				/>
			)}
		</div>
	)
}
