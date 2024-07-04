import { observer } from "mobx-react"
import { useCallback, useState } from "react"

interface Props {
	channelDescription: string
}

function ShowChannelDescription(props: Props) {
	const { channelDescription } = props
	const [isExpanded, setIsExpanded] = useState(false)
	const maxLength = 120

	const handleToggle = useCallback(() => {
		setIsExpanded(!isExpanded)
	}, [isExpanded])


	return (
		<div
			className="text-sm dark:text-zinc-200"
			style={{ width: "80vw", wordWrap: "break-word", whiteSpace: "normal" }}
		>
			{isExpanded ? (
				<>
					{channelDescription}
					<button onClick={handleToggle} className="text-blue-500">
						Show less
					</button>
				</>
			) : (
				<>
					{channelDescription.length > maxLength ? (
						<>
							{channelDescription.slice(0, maxLength)}...
							<button onClick={handleToggle} className="text-blue-500">Show more</button>
						</>
					) : (
						channelDescription
					)}
				</>
			)}
		</div>
	)
}

export default observer(ShowChannelDescription)
