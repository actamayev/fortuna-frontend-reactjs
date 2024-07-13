import _ from "lodash"
import { observer } from "mobx-react"
import MaxProfitByTier from "./max-profit-by-tier"
import { useCreatorContext } from "../../../contexts/creator-context"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"

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
			{creatorClass.newVideoDetails.tierData.length >= 1 && (
				<MaxProfitByTier tierNumber={1} />
			)}
			{creatorClass.newVideoDetails.tierData.length >= 2 && (
				<MaxProfitByTier tierNumber={2} />
			)}
			{creatorClass.newVideoDetails.tierData.length >= 3 && (
				<MaxProfitByTier tierNumber={3} />
			)}
			{creatorClass.newVideoFortunaFee && (
				<div>Fortuna Fee (2.5%): ${numberWithCommasFixed(creatorClass.newVideoFortunaFee, 2)}</div>
			)}
			{creatorClass.profitAfterFee && (
				<div>Max Profit: ${numberWithCommasFixed(creatorClass.profitAfterFee, 2)}</div>
			)}
		</div>
	)
}

export default observer(MaxProfitFromVideo)
