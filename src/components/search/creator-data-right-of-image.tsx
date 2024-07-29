import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	creatorData: CreatorData
}

function CreatorDataRightOfImage(props: Props) {
	const { creatorData } = props

	return (
		<div className="flex flex-col justify-start w-7/12 px-3 my-1">
			<div className="text-zinc-950 dark:text-white text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
				{creatorData.channelName}
			</div>
			<div className="flex flex-row">
				<div
					className="text-zinc-500 dark:text-zinc-400 text-xs break-words mt-1.5
						overflow-hidden text-ellipsis whitespace-nowrap"
				>
					@{creatorData.creatorUsername}&nbsp;
				</div>
				<div
					className="text-zinc-500 dark:text-zinc-400 text-xs break-words mt-1.5
						overflow-hidden text-ellipsis whitespace-nowrap"
				>
					• {creatorData.numberOfVideos} video{creatorData.numberOfVideos === 1 ? "" : "s"}
				</div>
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 break-words">
				{_.truncate(creatorData.channelDescription, { length: 150 })}
			</div>
		</div>
	)
}

export default observer(CreatorDataRightOfImage)
