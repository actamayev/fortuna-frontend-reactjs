import _ from "lodash"
import { observer } from "mobx-react"
import ShowNumberTiers from "./show-number-tiers"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function TiersInfo(props: Props) {
	const { videoData } = props

	if (
		videoData.isVideoExclusive === false ||
		_.isNull(videoData.numberOfExclusivePurchasesSoFar)
	) {
		return <>Not exclusive</>
	}

	return <ShowNumberTiers videoData={videoData} />
}

export default observer(TiersInfo)
