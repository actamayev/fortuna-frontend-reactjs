import _ from "lodash"
import TierSoldOut from "./tier-sold-out"
import PreviousTierMustSellOut from "./previous-tier-must-sell-out"
import DefiniteAmountAvailableInTier from "./definite-amount-available-in-tier"
import IndefiniteAmountAvailableInTier from "./indefinite-amount-available-in-tier"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

export default function TwoTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props

	// This is if the first tier is soldout:
	if ((tiers[0].isTierSoldOut === true)) {
		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(tiers[1].purchasesInThisTier)) {
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
					<IndefiniteAmountAvailableInTier tierNumber={2} tierData={tiers[1]} />
				</>
			)
		}
		// This is if both tiers are soldout
		if (numberOfExclusivePurchasesSoFar >= ((tiers[0].purchasesInThisTier as number) + tiers[1].purchasesInThisTier)) {
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
					<TierSoldOut tierNumber={2} tierData={tiers[1]}/>
				</>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
		return (
			<>
				<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
				<DefiniteAmountAvailableInTier
					tierNumber={2}
					tierAccessPrice={tiers[1].tierAccessPrice}
					numberPurchasesAvailable={
						`${(tiers[1].purchasesInThisTier + (tiers[0].purchasesInThisTier as number)) - numberOfExclusivePurchasesSoFar}/
						${tiers[1].purchasesInThisTier}`
					}
				/>
			</>
		)
	}

	return (
		<>
			<DefiniteAmountAvailableInTier
				tierNumber={1}
				tierAccessPrice={tiers[0].tierAccessPrice}
				numberPurchasesAvailable={
					`${(tiers[0].purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/ ${tiers[0].purchasesInThisTier}`
				}
			/>
			<PreviousTierMustSellOut tierNumber={2} tierAccessPrice={tiers[1].tierAccessPrice} />
		</>
	)
}
