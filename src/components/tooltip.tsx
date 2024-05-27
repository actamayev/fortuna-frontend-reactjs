interface Props {
	message: string
	width?: string
	children: React.ReactNode
}

export default function Tooltip(props: Props) {
	const { message, width, children } = props

	return (
		<div className="ml-2 relative flex items-center group">
			<div className="cursor-pointer">{children}</div>
			<div
				className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center \
					p-1.5 bg-white text-black text-sm rounded-md shadow-lg whitespace-normal max-w-sm min-w-max border border-gray-300"
				style={{ width: width || "auto", minWidth: "10rem" }}
			>
				{message}
			</div>
		</div>
	)
}
