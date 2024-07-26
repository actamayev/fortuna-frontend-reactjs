import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"

interface Props {
	channelDescription: string
}

function ChannelDescription(props: Props) {
	const { channelDescription } = props
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggle = useCallback(() => {
		setIsExpanded(!isExpanded)
	}, [isExpanded])

	if (_.isEmpty(channelDescription.trim())) return null

	return (
		<div className="w-full">
			<div
				className="dark:text-white text-sm w-full block"
				style={{
					wordBreak: "break-word",
					overflowWrap: "break-word"
				}}
			>
				{isExpanded ? (
					<div className="bg-zinc-200 dark:bg-zinc-700 rounded p-2">
						<div>{channelDescription}</div>
						<div className="my-2 flex justify-end">
							<span
								className="rounded-lg cursor-pointer p-2 font-medium
								bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 hover:dark:bg-zinc-900"
								onClick={handleToggle}
							>
								Collapse
							</span>
						</div>
					</div>
				) : (
					<div
						className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded p-2"
						onClick={handleToggle}
					>
						{_.truncate(channelDescription, { length: 300 })}
					</div>
				)}
			</div>
		</div>
	)
}

export default observer(ChannelDescription)
