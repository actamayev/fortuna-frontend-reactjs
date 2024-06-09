import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
}

function OneTierInfo(props: Props) {
	const { tier, numberOfExclusivePurchasesSoFar } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	if (_.isNull(tier.purchasesInThisTier) || _.isNull(numberOfExclusivePurchasesSoFar)) {
		return (
			<div onClick={onClickButton} className="border">
				<div>Tier 1</div>
				<div>Access Price: ${tier.tierAccessPrice}</div>
			</div>
		)
	}

	if (tier.isTierSoldOut === true) {
		return (
			<div className="border">
				<div>Tier 1</div>
				<div>Soldout</div>
				<div>Access Price: ${tier.tierAccessPrice}</div>
				<div>0/{tier.purchasesInThisTier} Available in this tier</div>
			</div>
		)
	}

	return (
		<div onClick={onClickButton} className="border">
			<div>Tier 1</div>
			<div>Access Price: ${tier.tierAccessPrice}</div>
			{tier.purchasesInThisTier - numberOfExclusivePurchasesSoFar}/{tier.purchasesInThisTier} Available in this tier
		</div>
	)
}

export default observer(OneTierInfo)
