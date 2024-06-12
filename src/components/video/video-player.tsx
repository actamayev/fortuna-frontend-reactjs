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
				<div className="w-full h-full rounded-lg bg-zinc-100 dark:bg-zinc-800" style={{ aspectRatio: "16/9" }}>
					<div className="relative w-full h-full rounded-lg overflow-hidden">
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
				className="w-full h-full rounded-lg"
				controlsList="nodownload"
			>
				<source src={video.videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
			</video>
		</div>
	)
}

export default observer(VideoPlayer)
