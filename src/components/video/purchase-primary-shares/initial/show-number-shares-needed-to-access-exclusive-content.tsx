import _ from "lodash"

interface Props {
	video: VideoDataWithVideoUrl
}

export default function ShowNumberSharesNeededToAccessExclusiveContent(props: Props) {
	const { video } = props

	if (video.isSplExclusive === false || _.isNull(video.valueNeededToAccessExclusiveContentUsd)) return null

	const sharesNeededToAccessExclusiveContent = video.valueNeededToAccessExclusiveContentUsd / video.listingSharePriceUsd

	return (
		<>
			Shares needed to access exclusive content: {sharesNeededToAccessExclusiveContent}
		</>
	)
}
