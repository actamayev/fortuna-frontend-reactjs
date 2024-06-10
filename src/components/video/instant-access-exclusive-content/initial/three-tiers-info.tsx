import _ from "lodash"
import TierSoldOut from "./tier-sold-out"
import PreviousTierMustSellOut from "./previous-tier-must-sell-out"
import DefiniteAmountAvailableInTier from "./definite-amount-available-in-tier"
import IndefiniteAmountAvailableInTier from "./indefinite-amount-available-in-tier"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

export default function ThreeTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props

	// This is if the first tier is soldout:
	if (tiers[0].isTierSoldOut === true) {
		// This is if both the first and second tier are sold out
		if (tiers[1].isTierSoldOut === true) {
			// All three are soldout
			if (tiers[2].isTierSoldOut === true) {
				return (
					<>
						<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
						<TierSoldOut tierNumber={2} tierData={tiers[1]}/>
						<TierSoldOut tierNumber={3} tierData={tiers[2]}/>
					</>
				)
			}

			// This is if the third tier has not purchase limit
			if (_.isNull(tiers[2].purchasesInThisTier)) {
				return (
					<>
						<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
						<TierSoldOut tierNumber={2} tierData={tiers[1]}/>
						<IndefiniteAmountAvailableInTier tierNumber={3} tierData={tiers[2]} />
					</>
				)
			}

			// First two tiers are soldout, third is avaialable
			return (
				<>
					<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
					<TierSoldOut tierNumber={2} tierData={tiers[1]}/>
					<DefiniteAmountAvailableInTier
						tierNumber={3}
						tierAccessPrice={tiers[2].tierAccessPrice}
						numberPurchasesAvailable={`
							${(tiers[2].purchasesInThisTier +
							(tiers[1].purchasesInThisTier as number) +
							(tiers[0].purchasesInThisTier as number)) -
							numberOfExclusivePurchasesSoFar}
							/${tiers[2].purchasesInThisTier}
						`}
					/>
				</>
			)
		}

		// First tier is soldout, 2 and 3 are available
		return (
			<>
				<TierSoldOut tierNumber={1} tierData={tiers[0]}/>
				<DefiniteAmountAvailableInTier
					tierNumber={2}
					tierAccessPrice={tiers[1].tierAccessPrice}
					numberPurchasesAvailable={`
						${(tiers[1].purchasesInThisTier as number) +
						(tiers[0].purchasesInThisTier as number) -
						numberOfExclusivePurchasesSoFar}
						/${tiers[1].purchasesInThisTier}
					`}
				/>
				<PreviousTierMustSellOut tierNumber={3} tierAccessPrice={tiers[2].tierAccessPrice} />
			</>
		)
	}

	// All three tiers are available
	return (
		<>
			<DefiniteAmountAvailableInTier
				tierNumber={1}
				tierAccessPrice={tiers[0].tierAccessPrice}
				numberPurchasesAvailable={`
				${(tiers[0].purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/${tiers[0].purchasesInThisTier}
			`}
			/>
			<PreviousTierMustSellOut tierNumber={2} tierAccessPrice={tiers[1].tierAccessPrice} />
			<PreviousTierMustSellOut tierNumber={3} tierAccessPrice={tiers[2].tierAccessPrice} />
		</>
	)
}
