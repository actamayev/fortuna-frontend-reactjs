import SingleCreatorPageVideo from "./single-creator-page-video"

interface Props {
	creatorData: CreatorDataHeldInClass
}

export default function CreatorPageVideoMap(props: Props) {
	const { creatorData } = props

	return (
		<>
			{creatorData.videoData.map((videoData) => {
				return <SingleCreatorPageVideo key={videoData.uuid} videoData={videoData} />
			})}
		</>
	)
}
