import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../contexts/video-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import SingleRecentUploadsCard from "../components/recent-uploads/single-recent-uploads-card"
import useRetrieveVideosByTagUseEffect from "../hooks/search/retrieve-videos-by-tag-use-effect"

function VideoHashtag() {
	const { videoHashtag } = useParams<{ videoHashtag: string }>()
	const videoClass = useVideoContext()
	useRetrieveVideosByTagUseEffect(videoHashtag)

	const isCurrentlySearchingHashtag = useMemo(() => {
		return videoClass.isCurrentlySearchingHashtag
	}, [videoClass.isCurrentlySearchingHashtag])

	if (_.isUndefined(videoHashtag)) return null

	if (isCurrentlySearchingHashtag === true) {
		return (
			<>
				<BasicHelmet
					pageTitleData={videoHashtag}
					description={`Searching for videos with #${videoHashtag} on Fortuna.
					Discover exclusive content and connect with your favorite creators.`}
					url={`https://www.createfortuna.com/hashtag/${videoHashtag}`}
				/>
				<div className="dark:text-zinc-200">
					Searching...
				</div>
			</>
		)
	}

	const hashtagResults = videoClass.contextForHashtagMap(videoHashtag)
	if (_.isUndefined(hashtagResults)) return null

	if (_.isEmpty(hashtagResults)) {
		return (
			<>
				<BasicHelmet
					pageTitleData={videoHashtag}
					description={`No results found with #${videoHashtag} on Fortuna.
					Try searching for different keywords to find exclusive video content.`}
					url={`https://www.createfortuna.com/hashtag/${videoHashtag}`}
				/>
				<div className="dark:text-zinc-200">
					No results videos found with #{videoHashtag}
				</div>
			</>
		)
	}

	return (
		<>
			<BasicHelmet
				pageTitleData={videoHashtag}
				description={`Videos with #${videoHashtag} on Fortuna. Explore exclusive videos and content from top creators.`}
				url={`https://www.createfortuna.com/hashtag/${videoHashtag}`}
			/>
			<div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-200 border-b border-zinc-300 dark:border-zinc-800 pb-2">
				#{videoHashtag}
			</div>
			<div className="grid grid-cols-5 gap-3 my-2">
				{hashtagResults.map((video, index) => (
					<SingleRecentUploadsCard
						key={video.uuid}
						video={video}
						index={index}
					/>
				))}
			</div>
		</>
	)
}

export default observer(VideoHashtag)
