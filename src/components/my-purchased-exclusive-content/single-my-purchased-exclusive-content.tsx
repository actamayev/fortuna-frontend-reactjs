import { useCallback } from "react"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	myPurchasedExclusiveContent: MyPurchasedExclusiveContent
}

export default function SingleMyPurchasedExclusiveContent(props: Props) {
	const { myPurchasedExclusiveContent } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(myPurchasedExclusiveContent.uuid)
	}, [myPurchasedExclusiveContent.uuid, navigateToVideoPage])

	return (
		<div
			className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 m-2 grid grid-cols-1 \
				grid-rows-1 border border-zinc-200 dark:border-zinc-700 hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
			style={{ width: "288px", height: "225px" }}
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold mb-2 dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
					{myPurchasedExclusiveContent.videoName}
				</h2>
				<GeneralizedVideoThumbnail
					thumbnailData={{
						imageUrl: myPurchasedExclusiveContent.imageUrl,
						videoName: myPurchasedExclusiveContent.videoName,
						videoDurationSeconds: myPurchasedExclusiveContent.videoDurationSeconds,
						videoListingStatus: "LISTED" // Doesn't matter, just has to be supplied
					}}
					showSoldOutSticker={false}
				/>
			</div>
		</div>
	)
}
