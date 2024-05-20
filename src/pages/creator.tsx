import CreatorPageVideoMap from "../components/creator/creator-page-video-map"
import CreatorPageHeaderArea from "../components/creator/creator-page-header-area"
import useRetrieveCreatorVideosAndDataUseEffect from "../hooks/videos/retrieve-creator-videos-and-data-use-effect"

export default function Creator() {
	useRetrieveCreatorVideosAndDataUseEffect()

	return (
		<div >
			<CreatorPageHeaderArea />
			<CreatorPageVideoMap />
		</div>
	)
}
