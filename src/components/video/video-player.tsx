interface Props {
	videoUrl: string
}

export default function VideoPlayer(props: Props) {
	const { videoUrl } = props

	return (
		<div>
			<video width="720" controls>
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
