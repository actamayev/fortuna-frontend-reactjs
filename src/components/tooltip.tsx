interface Props {
	message: string
}

export default function Tooltip(props: Props) {
	const { message } = props
	return (
		<div className="ml-2 relative flex items-center group">
			<div className="text-gray-500 cursor-pointer">ℹ️</div>
			<div
				className="absolute bottom-full right-0 mb-2 hidden group-hover:flex items-center justify-center \
					p-1.5 bg-gray-700 text-white text-xs rounded-md shadow-lg whitespace-normal max-w-sm min-w-max"
			>
				{message}
			</div>
		</div>
	)
}
