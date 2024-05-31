import { useParams } from "react-router-dom"
import CreatorPageVideoMap from "../components/creator/creator-page-video-map"
import CreatorPageHeaderArea from "../components/creator/creator-page-header-area"
import useRetrieveCreatorVideosAndDataUseEffect from "../hooks/videos/retrieve-creator-videos-and-data-use-effect"

export default function Creator() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
	useRetrieveCreatorVideosAndDataUseEffect(creatorUsername)

	return (
		<div >
			<CreatorPageHeaderArea />
			<CreatorPageVideoMap />
		</div>
	)
}
