import { useCallback } from "react"
import { observer } from "mobx-react"
import { MdIosShare } from "react-icons/md"
import HoverOutlineComponent from "../../hover-outline-component"
import { useNotificationsContext } from "../../../contexts/notifications-context"

interface Props {
	urlToCopy: string
	extraClasses?: string
}

function ShareVideoButton(props: Props) {
	const { urlToCopy, extraClasses = "mx-2" } = props
	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(urlToCopy)
			notificationsClass.setNeutralNotification("Video link copied to clipboard")
		} catch (error) {
			console.error(error)
		}
	}, [notificationsClass, urlToCopy])

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={copyToClipboard}
		>
			<MdIosShare size={22} className={extraClasses} />
		</HoverOutlineComponent>
	)
}

export default observer(ShareVideoButton)
