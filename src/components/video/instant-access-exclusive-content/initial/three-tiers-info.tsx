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

export default function ThreeTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)
	const thirdTier = getTierByTierNumber(tiers, 3)

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier) || _.isUndefined(thirdTier)) return null

	// This is if the first tier is soldout:
	if (firstTier.isTierSoldOut === true) {
		// This is if both the first and second tier are sold out
		if (secondTier.isTierSoldOut === true) {
			// All three are soldout
			if (thirdTier.isTierSoldOut === true) {
				return (
					<>
						<TierSoldOut tierNumber={1} tierData={firstTier}/>
						<TierSoldOut tierNumber={2} tierData={secondTier}/>
						<TierSoldOut tierNumber={3} tierData={thirdTier}/>
					</>
				)
			}

			// This is if the third tier has not purchase limit
			if (_.isNull(thirdTier.purchasesInThisTier)) {
				return (
					<>
						<TierSoldOut tierNumber={1} tierData={firstTier}/>
						<TierSoldOut tierNumber={2} tierData={secondTier}/>
						<IndefiniteAmountAvailableInTier tierNumber={3} tierData={thirdTier} />
					</>
				)
			}

			// First two tiers are soldout, third is avaialable
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={firstTier}/>
					<TierSoldOut tierNumber={2} tierData={secondTier}/>
					<DefiniteAmountAvailableInTier
						tierNumber={3}
						tierAccessPriceUsd={thirdTier.tierAccessPriceUsd}
						numberPurchasesAvailable={`
							${(thirdTier.purchasesInThisTier +
							(secondTier.purchasesInThisTier as number) +
							(firstTier.purchasesInThisTier as number)) -
							numberOfExclusivePurchasesSoFar}
							/${thirdTier.purchasesInThisTier}
						`}
					/>
				</>
			)
		}

		// First tier is soldout, 2 and 3 are available
		return (
			<>
				<TierSoldOut tierNumber={1} tierData={firstTier}/>
				<DefiniteAmountAvailableInTier
					tierNumber={2}
					tierAccessPriceUsd={secondTier.tierAccessPriceUsd}
					numberPurchasesAvailable={`
						${(secondTier.purchasesInThisTier as number) +
						(firstTier.purchasesInThisTier as number) -
						numberOfExclusivePurchasesSoFar}
						/${secondTier.purchasesInThisTier}
					`}
				/>
				<PreviousTierMustSellOut tierNumber={3} tierAccessPriceUsd={thirdTier.tierAccessPriceUsd} />
			</>
		)
	}

	// All three tiers are available
	return (
		<>
			<DefiniteAmountAvailableInTier
				tierNumber={1}
				tierAccessPriceUsd={firstTier.tierAccessPriceUsd}
				numberPurchasesAvailable={`
				${(firstTier.purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/${firstTier.purchasesInThisTier}
			`}
			/>
			<PreviousTierMustSellOut tierNumber={2} tierAccessPriceUsd={secondTier.tierAccessPriceUsd} />
			<PreviousTierMustSellOut tierNumber={3} tierAccessPriceUsd={thirdTier.tierAccessPriceUsd} />
		</>
	)
}
