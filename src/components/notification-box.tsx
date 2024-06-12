import _ from "lodash"
import { useEffect } from "react"
import { CSSTransition } from "react-transition-group"

interface Props {
	message: string | null
	onClose: () => void
}

export default function NotificationBox(props: Props) {
	const { message, onClose } = props

	useEffect(() => {
		if (_.isNull(message)) return
		const timer = setTimeout(() => {
			onClose()
		}, 3000)
		return () => clearTimeout(timer)
	}, [onClose, message])

	return (
		<CSSTransition
			in={!_.isNull(message)}
			timeout={300}
			classNames="notification"
			unmountOnExit
		>
			<div
				className="fixed bottom-5 right-1 transform -translate-x-1/2 bg-white dark:bg-black font-medium \
					text-zinc-950 dark:text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out"
				style={{
					// opacity: message ? 1 : 0,
					transform: message ? "translateY(0)" : "translateY(100%)",
					transition: "opacity 300ms, transform 300ms"
				}}
			>
				{message}
			</div>
		</CSSTransition>
	)
}
