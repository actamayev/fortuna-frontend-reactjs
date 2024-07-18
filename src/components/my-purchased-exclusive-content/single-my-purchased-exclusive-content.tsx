import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"
import BeneathThumbnailPurchasedExclusiveContent from "./beneath-thumbnail-purchased-exclusive-content"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
	index: number
}

function SingleMyPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent, index } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(myPurchasedExclusiveContent.uuid)
	}, [myPurchasedExclusiveContent.uuid, navigateToVideoPage])

	const marginClasses = useMemo(() => {
		const columnPosition = index % 4
		if (columnPosition === 0) {
			return "mr-2.5 my-2.5" // First column: no left margin
		} else if (columnPosition === 3) {
			return "ml-2.5 my-2.5" // Fourth column: no right margin
		}
		return "mx-2.5 my-2.5" // Other columns: left and right margins
	}, [index])

	return (
		<div
			className={`rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-700
			bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 ${marginClasses}`}
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
