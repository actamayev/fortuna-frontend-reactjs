import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"

interface Props {
	video: SingleVideoDataFromBackend
}

function VideoPlayer(props: Props) {
	const { video } = props
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (!videoRef.current) return
		videoRef.current.load()
	}, [video.videoUrl])

	// FUTURE TODO: Figure out how to use aspect-width and aspect-height instead.
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
						<div className="absolute inset-0 bg-zinc-800 bg-opacity-50 backdrop-blur" />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full">
			<video
				ref={videoRef}
				controls
				autoPlay
				playsInline
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
