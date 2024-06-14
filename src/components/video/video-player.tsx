import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	video: SingleVideoDataFromBackend
}

function VideoPlayer(props: Props) {
	const { video } = props

	if (_.isUndefined(video.videoUrl)) {
		return (
			<div className="w-full">
				<div className="w-full h-full" style={{ aspectRatio: "16/9" }}>
					<div className="relative w-full h-full rounded-xl overflow-hidden">
						<img
							src={video.imageUrl}
							className="w-full h-full object-cover"
							alt="Video Thumbnail"
						/>
						<div
							className="absolute inset-0 bg-zinc-800 bg-opacity-50"
							style={{ backdropFilter: "blur(8px)" }}
						/>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full">
			<video
				controls
				autoPlay
				className="w-full h-full rounded-xl"
				controlsList="nodownload"
				style={{ aspectRatio: "16/9" }}
			>
				<source src={video.videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
			</video>
		</div>
	)
}

// Keep this an observer, even though there aren't any contexts in this file.
// If the user has access to a video, and navigates to the video from the home page, the video url doesn't load unless this is an observer
export default observer(VideoPlayer)
