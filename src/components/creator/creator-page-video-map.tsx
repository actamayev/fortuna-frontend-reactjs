import { observer } from "mobx-react"
import SingleCreatorPageVideo from "./single-creator-page-video"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function CreatorPageVideoMap(props: Props) {
	const { creatorData } = props

	return (
		<>
			{creatorData.videoData.map(videoData => (
				<SingleCreatorPageVideo key={videoData.uuid} videoData={videoData} />
			))}
		</>
	)
}

export default observer(CreatorPageVideoMap)
