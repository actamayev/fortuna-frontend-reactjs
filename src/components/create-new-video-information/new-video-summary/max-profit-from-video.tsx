import _ from "lodash"
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
		if (_.isNull(creatorClass.newVideoFortunaFee)) return null
		return numberWithCommasFixed(creatorClass.newVideoFortunaFee, 2)
	}, [creatorClass.newVideoFortunaFee, numberWithCommasFixed])

	const profitAfterFee = useMemo(() => {
		return numberWithCommasFixed(creatorClass.profitAfterFee, 2)
	}, [creatorClass.profitAfterFee, numberWithCommasFixed])

	const isContentExclusive = useMemo(() => {
		return creatorClass.newVideoDetails.isContentExclusive
	}, [creatorClass.newVideoDetails.isContentExclusive])

	const doesNewVideoLimitNumberBuyers = useMemo(() => {
		return creatorClass.doesNewVideoLimitNumberBuyers
	}, [creatorClass.doesNewVideoLimitNumberBuyers])

	const tierDataLength = useMemo(() => {
		return creatorClass.newVideoDetails.tierData.length
	}, [creatorClass.newVideoDetails.tierData.length])

	if (isContentExclusive === false) return null

	if (doesNewVideoLimitNumberBuyers === false) {
		return (
			<div>Max Profit: $∞ (no limit of buyers)</div>
		)
	}

	return (
		<div>
			{tierDataLength >= 1 && (
				<MaxProfitByTier tierNumber={1} />
			)}
			{tierDataLength >= 2 && (
				<MaxProfitByTier tierNumber={2} />
			)}
			{tierDataLength >= 3 && (
				<MaxProfitByTier tierNumber={3} />
			)}
			{fortunaFee && (
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
