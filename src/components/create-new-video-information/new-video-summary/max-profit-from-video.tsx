import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../../utils/numbers-with-commas"
import { useCreatorContext } from "../../../contexts/creator-context"

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
				<div>
					Max Profit From Tier 1: ${numberWithCommas(_.round(creatorClass.getProfitByVideoTier(1) || 0, 3))} {" "}
					({creatorClass.newVideoDetails.tierData[0].purchasesInThisTier} purchases X {" "}
					{(100 - creatorClass.newVideoDetails.tierData[0].tierDiscount) / 100} X {" "}
					{creatorClass.lowestTierPrice})
				</div>
			)}
			{!_.isNull(creatorClass.getProfitByVideoTier(2)) && (
				<div>
					Max Profit From Tier 2: ${numberWithCommas(_.round(creatorClass.getProfitByVideoTier(2) || 0, 3))} {" "}
					({creatorClass.newVideoDetails.tierData[1].purchasesInThisTier} purchases X {" "}
					{(100 - creatorClass.newVideoDetails.tierData[1].tierDiscount) / 100} X {" "}
					{creatorClass.lowestTierPrice})
				</div>
			)}
			{!_.isNull(creatorClass.getProfitByVideoTier(3)) && (
				<div>
					Max Profit From Tier 3: ${numberWithCommas(_.round(creatorClass.getProfitByVideoTier(3) || 0, 3))} {" "}
					({creatorClass.newVideoDetails.tierData[2].purchasesInThisTier} purchases X {" "}
					{(100 - creatorClass.newVideoDetails.tierData[2].tierDiscount) / 100} X {" "}
					{creatorClass.lowestTierPrice})
				</div>
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
