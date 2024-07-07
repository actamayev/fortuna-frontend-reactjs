import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"

interface Props {
	channelDescription: string
}

function ShowChannelDescription(props: Props) {
	const { channelDescription } = props
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggle = useCallback(() => {
		setIsExpanded(!isExpanded)
	}, [isExpanded])

	if (_.isEmpty(channelDescription)) return null

	return (
		<div
			className="text-zinc-600 dark:text-zinc-300 text-sm \
			hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer px-1 mt-0.5 pt-0.5 pb-2 w-full"
			style={{
				wordWrap: "break-word",
				whiteSpace: "normal"
			}}
			onClick={handleToggle}
		>
			{isExpanded ? (
				<>{channelDescription}</>
			) : (
				<>{_.truncate(channelDescription, { length: 350, omission: "..." })}</>
			)}
		</div>
	)
}

export default observer(ShowChannelDescription)
