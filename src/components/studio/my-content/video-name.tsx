import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

function VideoName(props: Props) {
	const { content, toggleModalOpen } = props

	return (
		<div className="flex items-center w-full">
			<div
				className="relative flex flex-grow hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 px-2"
				onClick={toggleModalOpen}
			>
				<span className="text-zinc-900 dark:text-zinc-100 text-md font-medium w-full" >
					{_.truncate(content.videoName, { length: 35 })}
				</span>
			</div>
		</div>
	)
}

export default observer(VideoName)
