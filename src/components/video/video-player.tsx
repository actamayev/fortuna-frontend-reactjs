import _ from "lodash"

interface Props {
	videoUrl: string | undefined
}

// FUTURE TODO: Make the aspect ratio of the video player the same as the home screen thumnail picture.
export default function VideoPlayer(props: Props) {
	const { videoUrl } = props

	if (_.isUndefined(videoUrl)) {
		return (
			<div className="w-full">
				<video
					controls
					autoPlay
					className="w-full h-full rounded-lg"
					controlsList="nodownload"
				>
					Exclusiv content
				</video>
			</div>
		)
	}

	return (
		<div className="w-full">
			<video
				controls
				autoPlay
				className="w-full h-full rounded-lg"
				controlsList="nodownload" // Prevent download button
			>
				<source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
			</video>
		</div>
	)
}
