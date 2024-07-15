import { observer } from "mobx-react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import ShowUnlockStatus from "./show-unlock-status"
import { useRelativeDateFormatter } from "../../../hooks/date-formatter"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function BeneathThumbnailSection(props: Props) {
	const { videoData } = props
	const relativeDateFormatter = useRelativeDateFormatter()

	return (
		<div className="flex flex-col justify-start overflow-hidden w-full my-1 text-zinc-700 dark:text-zinc-300 text-xs">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center">
					<div className="ml-1 font-medium">
						<ShowUnlockStatus videoData={videoData} />
					</div>
					<div className="flex items-center mx-4">
						{videoData.userLikeStatus === true ? (
							<FaHeart color="red" size={15} />
						) : (
							<FaRegHeart size={15} />
						)}
						{videoData.numberOfLikes > 0 && (
							<span className="ml-1.5">
								{videoData.numberOfLikes}
							</span>
						)}
					</div>
				</div>
				<div className="ml-auto">
					{relativeDateFormatter(videoData.createdAt)}
				</div>
			</div>
		</div>
	)
}

export default observer(BeneathThumbnailSection)
