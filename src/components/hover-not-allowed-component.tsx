interface Props {
	children: React.ReactNode
}

export default function HoverNotAllowedComponent(props: Props) {
	const { children } = props

	return (
		<div
			className="flex items-center justify-center"
			style={{
				height: "40px",
				width: "40px",
				borderRadius: "50%",
				cursor: "not-allowed"
			}}
		>
			{children}
		</div>
	)
}
