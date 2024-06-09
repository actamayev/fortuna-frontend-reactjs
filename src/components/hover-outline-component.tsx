import { useState } from "react"

interface Props {
	onClickAction?: () => void
	id?: string
	extraClasses?: string
	children: React.ReactNode
}

export default function HoverOutlineComponent(props: Props) {
	const { onClickAction, id, extraClasses, children } = props
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			id={id}
			className={`relative flex items-center justify-center ${extraClasses}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: isHovered ? "rgba(128, 128, 128, 0.2)" : "transparent",
				borderRadius: "50%",
				cursor: "pointer"
			}}
			onClick={onClickAction}
		>
			{children}
		</div>
	)
}
