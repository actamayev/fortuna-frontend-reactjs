import _ from "lodash"
import TierSoldOut from "./tier-sold-out"
import PreviousTierMustSellOut from "./previous-tier-must-sell-out"
import DefiniteAmountAvailableInTier from "./definite-amount-available-in-tier"
import IndefiniteAmountAvailableInTier from "./indefinite-amount-available-in-tier"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

export default function TwoTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier)) return null

	// This is if the first tier is soldout:
	if ((firstTier.isTierSoldOut === true)) {
		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(secondTier.purchasesInThisTier)) {
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={firstTier}/>
					<IndefiniteAmountAvailableInTier tierNumber={2} tierData={secondTier} />
				</>
			)
		}
		// This is if both tiers are soldout
		if (numberOfExclusivePurchasesSoFar >= ((firstTier.purchasesInThisTier as number) + secondTier.purchasesInThisTier)) {
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={firstTier}/>
					<TierSoldOut tierNumber={2} tierData={secondTier}/>
				</>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
		return (
			<>
				<TierSoldOut tierNumber={1} tierData={firstTier}/>
				<DefiniteAmountAvailableInTier
					tierNumber={2}
					tierAccessPriceUsd={secondTier.tierAccessPriceUsd}
					numberPurchasesAvailable={
						`${(secondTier.purchasesInThisTier + (firstTier.purchasesInThisTier as number)) - numberOfExclusivePurchasesSoFar}/
						${secondTier.purchasesInThisTier}`
					}
				/>
			</>
		)
	}

	return (
		<>
			<DefiniteAmountAvailableInTier
				tierNumber={1}
				tierAccessPriceUsd={firstTier.tierAccessPriceUsd}
				numberPurchasesAvailable={
					`${(firstTier.purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/ ${firstTier.purchasesInThisTier}`
				}
			/>
			<PreviousTierMustSellOut tierNumber={2} tierAccessPriceUsd={secondTier.tierAccessPriceUsd} />
		</>
	)
}
