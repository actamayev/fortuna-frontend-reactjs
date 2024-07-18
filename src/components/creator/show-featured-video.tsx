import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleCreatorPageVideo from "./creator-videos-map/single-creator-page-video"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus[]
}

function ShowFeaturedVideo(props: Props) {
	const { videoData } = props

	const featuredVideo = useMemo(() => {
		return videoData.find(video => video.isVideoFeatured === true)
	}, [videoData])

	if (_.isUndefined(featuredVideo)) return null

	return (
		<div className="flex flex-col items-center">
			<div
				className="flex justify-start font-bold dark:text-white text-3xl mb-2
				border-t border-b border-zinc-800 dark:border-zinc-200"
			>
				Featured Video
			</div>
			<SingleCreatorPageVideo videoData={featuredVideo} />
		</div>
	)
}

export default observer(ShowFeaturedVideo)
