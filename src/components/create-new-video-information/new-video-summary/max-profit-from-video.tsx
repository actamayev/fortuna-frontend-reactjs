import _ from "lodash"
import { observer } from "mobx-react"
import MaxProfitByTier from "./max-profit-by-tier"
import { useCreatorContext } from "../../../contexts/creator-context"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { SuperMoneyStyleDollars } from "../../usd-or-sol/super-money-style"

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

	const forunaFee = numberWithCommasFixed(creatorClass.newVideoFortunaFee, 2)
	const profitAfterFee = numberWithCommasFixed(creatorClass.profitAfterFee, 2)

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
				<div>
					Fortuna Fee (2.5%):
					<SuperMoneyStyleDollars dollars={forunaFee.dollars} cents={forunaFee.cents}/>
				</div>
			)}
			{creatorClass.profitAfterFee && (
				<div>
					Max Profit:
					<SuperMoneyStyleDollars dollars={profitAfterFee.dollars} cents={profitAfterFee.cents}/>
				</div>
			)}
		</div>
	)
}

export default observer(MaxProfitFromVideo)
