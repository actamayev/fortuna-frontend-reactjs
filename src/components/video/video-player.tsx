interface Props {
	videoUrl: string
}

// TODO: Make the aspect ratio of the video player the same as the home screen thumnail picture.
export default function VideoPlayer(props: Props) {
	const { videoUrl } = props

	return (
		<div>
			<video
				width="1280"
				controls
				autoPlay
				className="rounded-lg"
			>
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
