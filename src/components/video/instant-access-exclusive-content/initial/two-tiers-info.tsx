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
						numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
					/>
					<TierProgressBar
						isActive={true}
						tier={secondTier}
						numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
					/>
					{/* <TierSoldOut tierNumber={1} tierData={firstTier}/>
					<IndefiniteAmountAvailableInTier tierNumber={2} tierData={secondTier} /> */}
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
						numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
					/>
					<TierProgressBar
						isActive={false}
						tier={secondTier}
						numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
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
					numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
				/>
				<TierProgressBar
					isActive={true}
					tier={secondTier}
					numberOfExclusivePurchasesSoFar={
						((secondTier.purchasesInThisTier + (firstTier.purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar)) /
						secondTier.purchasesInThisTier
					}
				/>
				{/* <TierSoldOut tierNumber={1} tierData={firstTier}/>
				<DefiniteAmountAvailableInTier
					tierNumber={2}
					tierAccessPriceUsd={secondTier.tierAccessPriceUsd}
					numberPurchasesAvailable={
						`${(secondTier.purchasesInThisTier + (firstTier.purchasesInThisTier as number)) - numberOfExclusivePurchasesSoFar}/
						${secondTier.purchasesInThisTier}`
					}
				/> */}
			</div>
		)
	}

	return (
		<div onClick={onClickButton} className="cursor-pointer">
			<TierProgressBar
				isActive={true}
				tier={firstTier}
				numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
			/>
			<TierProgressBar
				isActive={false}
				tier={secondTier}
				numberOfExclusivePurchasesSoFar={0}
			/>
			{/* <DefiniteAmountAvailableInTier
				tierNumber={1}
				tierAccessPriceUsd={firstTier.tierAccessPriceUsd}
				numberPurchasesAvailable={
					`${(firstTier.purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/ ${firstTier.purchasesInThisTier}`
				}
			/>
			<PreviousTierMustSellOut tierNumber={2} tierAccessPriceUsd={secondTier.tierAccessPriceUsd} /> */}
		</div>
	)
}

export default observer(TwoTiersInfo)
