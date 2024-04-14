interface Props {
	videoUrl: string
}

export default function VideoPlayer(props: Props) {
	const { videoUrl } = props

	return (
		<div>
			<h1>Video from S3</h1>
			<video width="720" controls>
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
