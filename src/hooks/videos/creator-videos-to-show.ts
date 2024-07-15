import _ from "lodash"
import { useObserver } from "mobx-react"
import { useVideoContext } from "../../contexts/video-context"

export default function useVideosToShow(
	videoData: VideoDataLessVideoUrl[]
): VideoDataLessVideoUrl[] {
	const videosClass = useVideoContext()

	return useObserver(() => {
		let filteredContent = videoData

		// Filter by title
		if (!_.isEmpty(videosClass.creatorVideosFilter.titleIncludes)) {
			filteredContent = filteredContent.filter(content =>
				content.videoName.toLowerCase().includes(videosClass.creatorVideosFilter.titleIncludes.toLowerCase())
			)
		}

		return filteredContent
	})
}
