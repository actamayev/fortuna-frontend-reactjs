import { observer } from "mobx-react"
import { CSSTransition } from "react-transition-group"
import { useNotificationsContext } from "../contexts/notifications-context"

function NotificationBox() {
	const notificationsClass = useNotificationsContext()

	return (
		<CSSTransition
			in={true}
			timeout={300}
			classNames="notification"
			unmountOnExit
		>
			<div
				className={`fixed bottom-5 right-1 transform -translate-x-1/2 ${notificationsClass.notificationBoxClasses} \
					font-medium px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out`}
				style={{
					opacity: notificationsClass.notification ? 1 : 0,
					transform: notificationsClass.notification ? "translateY(0)" : "translateY(100%)",
					transition: "opacity 300ms, transform 300ms"
				}}
			>
				{notificationsClass.notification}
			</div>
		</CSSTransition>
	)
}

export default observer(NotificationBox)
