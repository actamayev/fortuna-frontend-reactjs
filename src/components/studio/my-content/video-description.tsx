import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

function VideoDescription(props: Props) {
	const { content, toggleModalOpen } = props

	return (
		<div
			className="relative flex flex-grow hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer pt-1 px-2 w-full"
			onClick={toggleModalOpen}
			style={{ minHeight: "72%" }} // Ensure the container has a minimum height
		>
			<span className="text-zinc-700 dark:text-zinc-300 text-sm font-normal w-full">
				{_.truncate(content.description, { length: 150, omission: "..." })}
			</span>
		</div>
	)
}

export default observer(VideoDescription)
