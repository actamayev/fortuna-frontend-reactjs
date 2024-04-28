import { useParams } from "react-router-dom"
import CreatorPageVideoMap from "../components/creator/creator-page-video-map"
import CreatorPageHeaderArea from "../components/creator/creator-page-header-area"
import useRetrieveCreatorVideosAndData from "../hooks/videos/retrieve-creator-videos-and-data"

export default function Creator() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
	useRetrieveCreatorVideosAndData(creatorUsername)

	return (
		<div >
			<CreatorPageHeaderArea />
			<CreatorPageVideoMap />
		</div>
	)
}
