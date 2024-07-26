import { useMemo } from "react"
import { observer } from "mobx-react"
import MaxProfitByTier from "./max-profit-by-tier"
import { useCreatorContext } from "../../../contexts/creator-context"
import { SuperMoneyStyleDollars } from "../../usd-or-sol/super-money-style"
import { useNumberWithCommasFixed } from "../../../hooks/numbers/numbers-with-commas"

function MaxProfitFromVideo() {
	const creatorClass = useCreatorContext()
	const numberWithCommasFixed = useNumberWithCommasFixed()

	const fortunaFee = useMemo(() => {
		return numberWithCommasFixed(creatorClass.newVideoFortunaFee, 2)
	}, [creatorClass.newVideoFortunaFee, numberWithCommasFixed])

	const profitAfterFee = useMemo(() => {
		return numberWithCommasFixed(creatorClass.profitAfterFee, 2)
	}, [creatorClass.profitAfterFee, numberWithCommasFixed])

	if (creatorClass.newVideoDetails.isContentExclusive === false) return null

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
				<div>
					Fortuna Fee (2.5%):&nbsp;
					<SuperMoneyStyleDollars dollars={fortunaFee.dollars} cents={fortunaFee.cents}/>
				</div>
			)}
			{creatorClass.profitAfterFee && (
				<div>
					Max Profit:&nbsp;
					<SuperMoneyStyleDollars dollars={profitAfterFee.dollars} cents={profitAfterFee.cents}/>
				</div>
			)}
		</div>
	)
}

export default observer(MaxProfitFromVideo)
