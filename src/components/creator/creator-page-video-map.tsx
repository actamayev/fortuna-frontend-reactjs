import { observer } from "mobx-react"
import SingleCreatorPageVideo from "./single-creator-page-video"

interface Props {
	videoData: VideoDataLessVideoUrl[]
}

function CreatorPageVideoMap(props: Props) {
	const { videoData } = props

	return (
		<>
			{videoData.map(singleVideoData => (
				<SingleCreatorPageVideo key={singleVideoData.uuid} videoData={singleVideoData} />
			))}
		</>
	)
}

export default observer(CreatorPageVideoMap)
