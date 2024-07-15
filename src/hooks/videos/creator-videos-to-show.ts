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

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (videosClass.creatorVideosFilter.lockFilter) {
			switch (videosClass.creatorVideosFilter.lockFilter) {
			case "Locked":
				filteredContent = filteredContent.filter(content => !content.isUserAbleToAccessVideo)
				break
			case "Unlocked":
				filteredContent = filteredContent.filter(content => content.isUserAbleToAccessVideo)
				break
			case "All":
			default:
			// Do nothing, show all videos
				break
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (videosClass.creatorVideosFilter.timeframeSort) {
			switch (videosClass.creatorVideosFilter.timeframeSort) {
			case "Latest":
				filteredContent = _.orderBy(filteredContent, ["createdAt"], ["desc"])
				break
			case "Popular":
				filteredContent = _.orderBy(filteredContent, ["numberOfLikes"], ["desc"])
				break
			case "Oldest":
				filteredContent = _.orderBy(filteredContent, ["createdAt"], ["asc"])
				break
			default:
				break
			}
		}

		return filteredContent
	})
}
