import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../../utils/numbers-with-commas"
import { useCreatorContext } from "../../../contexts/creator-context"

function MaxProfitFromVideo() {
	const creatorClass = useCreatorContext()

	if (
		_.isNull(creatorClass) ||
		creatorClass.newVideoDetails.isContentExclusive === false
	) return null

	if (_.isNull(creatorClass.maxProfitFromNewVideo)) {
		return (
			<>Max Profit: $∞ (no limit of buyers)</>
		)
	}

	return (
		<>
			Max Profit: ${numberWithCommas(_.round(creatorClass.maxProfitFromNewVideo, 3))}
		</>
	)
}

export default observer(MaxProfitFromVideo)
