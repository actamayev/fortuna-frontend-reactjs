import { observer } from "mobx-react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import ShowUnlockStatus from "./show-unlock-status"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function BeneathDescritionSection(props: Props) {
	const { videoData } = props

	return (
		<div className="flex flex-col justify-start overflow-hidden w-full my-2 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
			<div className="flex flex-row items-center">
				<div>
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
		</div>
	)
}

export default observer(BeneathDescritionSection)
