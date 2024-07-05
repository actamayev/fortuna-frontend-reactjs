import _ from "lodash"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { CSSTransition } from "react-transition-group"
import { useNotificationsContext } from "../contexts/notifications-context"

function NotificationBox() {
	const notificationsClass = useNotificationsContext()

	useEffect(() => {
		if (_.isNull(notificationsClass.notification)) return
		const timer = setTimeout(() => {
			notificationsClass.setNotificationNull()
		}, 3000)
		return () => clearTimeout(timer)
	}, [notificationsClass, notificationsClass.notification])

	if (_.isNull(notificationsClass.notification)) return null

	return (
		<CSSTransition
			in={true}
			timeout={300}
			classNames="notification"
			unmountOnExit
		>
			<div
				className="fixed bottom-5 right-1 transform -translate-x-1/2 bg-white dark:bg-black font-medium \
					text-zinc-950 dark:text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out"
				style={{
					transform: notificationsClass.notification ? "translateY(0)" : "translateY(100%)",
					// The transition doesn't currently work. It works if the _.isNull(notificationsClass.notification) is removed.
					// eslint-disable-next-line max-len
					// However, if it's removed, there is a small white dot that stays on the bottom right of the screen after the notification is set to null
					transition: "opacity 300ms, transform 300ms"
				}}
			>
				{notificationsClass.notification}
			</div>
		</CSSTransition>
	)
}

export default observer(NotificationBox)
