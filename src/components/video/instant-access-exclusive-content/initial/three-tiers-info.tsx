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

// eslint-disable-next-line max-lines-per-function
function ThreeTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)
	const thirdTier = getTierByTierNumber(tiers, 3)
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass) || secondTier?.isTierSoldOut === true) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass, secondTier?.isTierSoldOut])

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier) || _.isUndefined(thirdTier)) return null

	// This is if the first tier is soldout:
	if (firstTier.isTierSoldOut === true) {
		// This is if both the first and second tier are sold out
		if (secondTier.isTierSoldOut === true) {
			// All three are soldout
			if (thirdTier.isTierSoldOut === true) {
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
						<TierProgressBar
							isActive={false}
							tier={thirdTier}
							numberOfPurchasesInThisTierSoFar={thirdTier.purchasesInThisTier}
						/>
					</div>
				)
			}

			// This is if the third tier has not purchase limit
			if (_.isNull(thirdTier.purchasesInThisTier)) {
				return (
					<div onClick={onClickButton} className="cursor-pointer">
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
						<TierProgressBar
							isActive={true}
							tier={thirdTier}
							numberOfPurchasesInThisTierSoFar={thirdTier.purchasesInThisTier}
						/>
					</div>
				)
			}

			// First two tiers are soldout, third is avaialable
			return (
				<div onClick={onClickButton} className="cursor-pointer">
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
					<TierProgressBar
						isActive={true}
						tier={thirdTier}
						numberOfPurchasesInThisTierSoFar={
							numberOfExclusivePurchasesSoFar -
							((firstTier.purchasesInThisTier as number) + (secondTier.purchasesInThisTier as number))
						}
					/>
				</div>
			)
		}

		// First tier is soldout, 2 and 3 are available
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
					numberOfPurchasesInThisTierSoFar={
						((firstTier.purchasesInThisTier as number) + (secondTier.purchasesInThisTier as number)) -
						numberOfExclusivePurchasesSoFar
					}
				/>
				<TierProgressBar
					isActive={false}
					tier={thirdTier}
					numberOfPurchasesInThisTierSoFar={0}
				/>
			</div>
		)
	}

	// All three tiers are available
	return (
		<div onClick={onClickButton} className="cursor-pointer">
			<TierProgressBar
				isActive={false}
				tier={firstTier}
				numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar}
			/>
			<TierProgressBar
				isActive={false}
				tier={secondTier}
				numberOfPurchasesInThisTierSoFar={0}
			/>
			<TierProgressBar
				isActive={false}
				tier={thirdTier}
				numberOfPurchasesInThisTierSoFar={0}
			/>
		</div>
	)
}

export default observer(ThreeTiersInfo)
