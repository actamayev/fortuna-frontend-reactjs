import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import ShowUnlockStatus from "./show-unlock-status"
import { useRelativeDateFormatter } from "../../../hooks/date-formatter"
import ShareVideoButton from "../../video/sub-video-section/share-video-button"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function BeneathThumbnailSection(props: Props) {
	const { videoData } = props
	const relativeDateFormatter = useRelativeDateFormatter()

	const videoUrlToCopy = useMemo(() => {
		const { protocol, hostname, port } = window.location
		const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`
		return (`${baseUrl}/v/${videoData.uuid}`)
	}, [videoData.uuid])

	return (
		<div className="flex flex-col justify-start overflow-hidden w-full mt-2">
			<div className="flex flex-row items-center space-x-4">
				<ShowUnlockStatus videoData={videoData}/>
				<div className="flex items-center">
					{videoData.userLikeStatus === true ? (
						<FaHeart size={22} color="red"/>
					) : (
						<FaRegHeart size={22} />
					)}
					{videoData.numberOfLikes > 0 && (
						<span className="ml-1.5 text-md">
							{videoData.numberOfLikes}
						</span>
					)}
				</div>
				<div className="flex items-center">
					<ShareVideoButton
						urlToCopy={videoUrlToCopy}
						extraClasses="mb-1"
					/>
				</div>
				{relativeDateFormatter(videoData.createdAt)}
			</div>
		</div>
	)
}

export default observer(BeneathThumbnailSection)
