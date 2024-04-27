interface Props {
	videoData: VideoData
}

export default function SingleVideoSearchItem(props: Props) {
	const { videoData } = props

	return (
		<div>
			Video name: {videoData.splName}
		</div>
	)
}
