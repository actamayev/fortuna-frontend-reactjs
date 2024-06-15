import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import TierProgressBar from "./tier-progress-bar"
import { useMarketContext } from "../../../../contexts/market-context"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

function TwoTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass) || secondTier?.isTierSoldOut === true) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass, secondTier?.isTierSoldOut])

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier)) return null

	// This is if the first tier is soldout:
	if ((firstTier.isTierSoldOut === true)) {
		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(secondTier.purchasesInThisTier)) {
			return (
				<div onClick={onClickButton} className="cursor-pointer">
					<TierProgressBar
						isActive={false}
						tier={firstTier}
						numberOfPurchasesInThisTierSoFar={firstTier.purchasesInThisTier}
					/>
					<TierProgressBar
						isActive={true}
						tier={secondTier}
						numberOfPurchasesInThisTierSoFar={secondTier.purchasesInThisTier}
					/>
				</div>
			)
		}
		// This is if both tiers are soldout
		if (numberOfExclusivePurchasesSoFar >= ((firstTier.purchasesInThisTier as number) + secondTier.purchasesInThisTier)) {
			return (
				<div>
					<TierProgressBar
						isActive={false}
						tier={firstTier}
						numberOfPurchasesInThisTierSoFar={firstTier.purchasesInThisTier}
					/>
					<TierProgressBar
						isActive={false}
						tier={secondTier}
						numberOfPurchasesInThisTierSoFar={secondTier.purchasesInThisTier}
					/>
				</div>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
		return (
			<div onClick={onClickButton} className="cursor-pointer">
				<TierProgressBar
					isActive={false}
					tier={firstTier}
					numberOfPurchasesInThisTierSoFar={firstTier.purchasesInThisTier}
				/>
				<TierProgressBar
					isActive={true}
					tier={secondTier}
					numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar - (firstTier.purchasesInThisTier as number)}
				/>
			</div>
		)
	}

	return (
		<div onClick={onClickButton} className="cursor-pointer">
			<TierProgressBar
				isActive={true}
				tier={firstTier}
				numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar}
			/>
			<TierProgressBar
				isActive={false}
				tier={secondTier}
				numberOfPurchasesInThisTierSoFar={0}
			/>
		</div>
	)
}

export default observer(TwoTiersInfo)
