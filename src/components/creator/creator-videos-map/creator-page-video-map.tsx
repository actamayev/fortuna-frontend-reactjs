import { observer } from "mobx-react"
import SingleCreatorPageVideo from "./single-creator-page-video"
import useVideosToShow from "../../../hooks/videos/creator-videos-to-show"

interface Props {
	videoData: VideoDataLessVideoUrl[]
}

function CreatorPageVideoMap(props: Props) {
	const { videoData } = props
	const videosToShow = useVideosToShow(videoData)

	return (
		<>
			{videosToShow.map(singleVideoData => (
				<div key={singleVideoData.uuid} className="flex flex-col items-center">
					<SingleCreatorPageVideo videoData={singleVideoData} />
				</div>
			))}
		</>
	)
}

export default observer(CreatorPageVideoMap)
