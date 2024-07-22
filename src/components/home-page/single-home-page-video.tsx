import { useCallback } from "react"
import HomePageVideoInfo from "./home-page-video-info"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	singleHomePageVideo: UrlExtendedSingleVideoData
}

export default function SingleHomePageVideo(props: Props) {
	const { singleHomePageVideo } = props

	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(singleHomePageVideo.uuid)
	}, [navigateToVideoPage, singleHomePageVideo.uuid])

	return (
		<div
			className="flex-none flex flex-col items-center w-full h-full rounded-lg cursor-pointer
				hover:bg-zinc-100 dark:hover:bg-zinc-800"
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex w-full">
				<div className="w-5/12">
					<GeneralizedVideoThumbnail
						thumbnailData={singleHomePageVideo}
						imageStyles={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
					/>
				</div>
				<HomePageVideoInfo videoData={singleHomePageVideo} />
			</div>
		</div>
	)
}
