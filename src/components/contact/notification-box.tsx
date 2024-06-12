import { useEffect } from "react"
import { CSSTransition } from "react-transition-group"

interface Props {
	message: string
	showNotification: boolean
	onClose: () => void
}

export default function NotificationBox(props: Props) {
	const { message, showNotification, onClose } = props

	useEffect(() => {
		if (showNotification === false) return
		const timer = setTimeout(() => {
			onClose()
		}, 3000)
		return () => clearTimeout(timer)
	}, [showNotification, onClose])

	return (
		<CSSTransition
			in={showNotification}
			timeout={300}
			classNames="notification"
			unmountOnExit
		>
			<div
				className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-zinc-800 \
					text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out"
				style={{
					opacity: showNotification ? 1 : 0,
					transform: showNotification ? "translateY(0)" : "translateY(100%)",
					transition: "opacity 300ms, transform 300ms"
				}}
			>
				{message}
			</div>
		</CSSTransition>
	)
}
