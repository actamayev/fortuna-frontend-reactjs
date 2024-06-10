import _ from "lodash"
import TierSoldOut from "./tier-sold-out"
import DefiniteAmountAvailableInTier from "./definite-amount-available-in-tier"
import IndefiniteAmountAvailableInTier from "./indefinite-amount-available-in-tier"

interface Props {
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
}

export default function OneTierInfo(props: Props) {
	const { tier, numberOfExclusivePurchasesSoFar } = props

	if (_.isNull(tier.purchasesInThisTier) || _.isNull(numberOfExclusivePurchasesSoFar)) {
		return (
			<IndefiniteAmountAvailableInTier tierNumber={1} tierData={tier} />
		)
	}

	if (tier.isTierSoldOut === true) {
		return (
			<TierSoldOut tierNumber={1} tierData={tier} />
		)
	}

	return (
		<DefiniteAmountAvailableInTier
			tierNumber={1}
			tierAccessPrice={tier.tierAccessPrice}
			numberPurchasesAvailable={`${tier.purchasesInThisTier - numberOfExclusivePurchasesSoFar}/${tier.purchasesInThisTier}`}
		/>
	)
}
