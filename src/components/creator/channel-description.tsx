import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"

interface Props {
	channelDescription: string
}

function ChannelDescription(props: Props) {
	const { channelDescription } = props
	const [isExpanded, setIsExpanded] = useState(false)

	if (_.isEmpty(channelDescription.trim())) return null

	return (
		<div
			className="text-zinc-600 dark:text-zinc-300 text-sm w-full"
			style={{
				wordWrap: "break-word",
				whiteSpace: "normal"
			}}
		>
			{isExpanded ? (
				<div className="bg-zinc-200 dark:bg-zinc-700 rounded p-2">
					<div>{channelDescription}</div>
					<div className="my-2 flex justify-end">
						<span
							className="rounded-lg cursor-pointer p-2 font-medium
							bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 hover:dark:bg-zinc-900"
							onClick={() => setIsExpanded(false)}
						>
							Collapse
						</span>
					</div>
				</div>
			) : (
				<div
					className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded p-2"
					onClick={() => setIsExpanded(true)}
				>
					{_.truncate(channelDescription, { length: 350 })}
				</div>
			)}
		</div>
	)
}

export default observer(ChannelDescription)
