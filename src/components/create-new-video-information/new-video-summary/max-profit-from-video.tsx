import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../../utils/numbers-with-commas"
import { useCreatorContext } from "../../../contexts/creator-context"

function MaxProfitFromVideo() {
	const creatorClass = useCreatorContext()

	if (
		_.isNull(creatorClass) ||
		creatorClass.newVideoDetails.isContentExclusive === false ||
		_.isNull(creatorClass.maxProfitFromNewVideo)
	) return null

	return (
		<>
			Max Profit: ${numberWithCommas(_.round(creatorClass.maxProfitFromNewVideo, 3))}
		</>
	)
}

export default observer(MaxProfitFromVideo)
