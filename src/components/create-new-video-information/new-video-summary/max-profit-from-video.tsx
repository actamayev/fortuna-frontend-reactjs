import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../../utils/numbers-with-commas"
import { useCreatorContext } from "../../../contexts/creator-context"
import MaxProfitByTier from "./max-profit-by-tier"

// eslint-disable-next-line complexity
function MaxProfitFromVideo() {
	const creatorClass = useCreatorContext()

	if (
		_.isNull(creatorClass) ||
		creatorClass.newVideoDetails.isContentExclusive === false
	) return null

	if (creatorClass.doesNewVideoLimitNumberBuyers === false) {
		return (
			<div>Max Profit: $∞ (no limit of buyers)</div>
		)
	}

	return (
		<div>
			{creatorClass.getProfitByVideoTier(1) && (
				<MaxProfitByTier tierNumber={1} />
			)}
			{!_.isNull(creatorClass.getProfitByVideoTier(2)) && (
				<MaxProfitByTier tierNumber={2} />

			)}
			{!_.isNull(creatorClass.getProfitByVideoTier(3)) && (
				<MaxProfitByTier tierNumber={3} />

			)}
			{creatorClass.newVideoFortunaFee && (
				<div>Fortuna Fee (2.5%): ${numberWithCommas(_.round(creatorClass.newVideoFortunaFee, 3))}</div>
			)}
			{creatorClass.profitAfterFee && (
				<div>Max Profit: ${numberWithCommas(_.round(creatorClass.profitAfterFee, 3))}</div>
			)}
		</div>
	)
}

export default observer(MaxProfitFromVideo)
