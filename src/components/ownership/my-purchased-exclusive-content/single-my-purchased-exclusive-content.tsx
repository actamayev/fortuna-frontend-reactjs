import { useCallback } from "react"
import { observer } from "mobx-react"
import GeneralizedVideoThumbnail from "../../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"
import BeneathThumbnailPurchasedExclusiveContent from "./beneath-thumbnail-purchased-exclusive-content"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
}

function SingleMyPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(myPurchasedExclusiveContent.uuid)
	}, [myPurchasedExclusiveContent.uuid, navigateToVideoPage])

	return (
		<div
			className="m-2.5 rounded-lg cursor-pointer bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToVideoPageCallback}
		>
			<GeneralizedVideoThumbnail
				thumbnailData={{
					imageUrl: myPurchasedExclusiveContent.imageUrl,
					videoName: myPurchasedExclusiveContent.videoName,
					videoDurationSeconds: myPurchasedExclusiveContent.videoDurationSeconds,
					videoListingStatus: "LISTED" // Doesn't matter, just has to be supplied
				}}
				showSoldOutSticker={false}
				imageStyles={{
					borderBottomLeftRadius: 0, borderBottomRightRadius: 0
				}}
			/>
			<BeneathThumbnailPurchasedExclusiveContent myPurchasedExclusiveContent={myPurchasedExclusiveContent} />
		</div>
	)
}

export default observer(SingleMyPurchasedExclusiveContent)
