import _ from "lodash"
import { observer } from "mobx-react"
import { FaClock } from "react-icons/fa"
import BeneathDescriptionSection from "./beneath-description-section"
import { useRelativeDateFormatter } from "../../../hooks/date-formatter"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function CreatorVideoRightInformationSection(props: Props) {
	const { videoData } = props
	const relativeDateFormatter = useRelativeDateFormatter()

	return (
		<div className="flex flex-col justify-start w-1/2 mx-3 my-1.5">
			<div className="flex justify-between items-center">
				<div
					className="flex-1 min-w-0 text-2xl font-semibold truncate
			dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap"
				>
					{videoData.videoName}
				</div>
				<div className="text-zinc-500 dark:text-zinc-400 font-light text-xs flex-shrink-0 ml-4">
					<div className="flex flex-row items-center">
						<FaClock className="mr-2" />
						{relativeDateFormatter(videoData.createdAt)}
					</div>
				</div>
			</div>
			<div className="text-sm text-zinc-600 dark:text-zinc-300 font-light">
				{_.truncate(videoData.description, { length: 350 })}
			</div>
			<div className="mt-auto">
				<BeneathDescriptionSection videoData={videoData} />
			</div>
		</div>
	)
}

export default observer(CreatorVideoRightInformationSection)
