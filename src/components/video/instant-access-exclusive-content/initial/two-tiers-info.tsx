import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

// eslint-disable-next-line max-lines-per-function
function TwoTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	// This is if the first tier is soldout:
	if ((tiers[0].isTierSoldOut === true)) {
		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(tiers[1].purchasesInThisTier)) {
			return (
				<>
					<div className="border">
						<div>Tier 1</div>
						<div>Soldout</div>
						<div>Access Price: ${tiers[0].tierAccessPrice}</div>
						<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
					</div>
					<div onClick={onClickButton} className="border">
						<div>Tier 2 {" "}</div>
						Access Price: ${tiers[1].tierAccessPrice}
					</div>
				</>
			)
		}
		// This is if both tiers are soldout
		if (numberOfExclusivePurchasesSoFar >= ((tiers[0].purchasesInThisTier as number) + tiers[1].purchasesInThisTier)) {
			return (
				<>
					<div className="border">
						<div>Tier 1</div>
						<div>Soldout</div>
						<div>Access Price: ${tiers[0].tierAccessPrice}</div>
						<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
					</div>
					<div className="border">
						<div>Tier 2</div>
						<div>Soldout</div>
						<div>Access Price: ${tiers[1].tierAccessPrice}</div>
						<div>0/{tiers[1].purchasesInThisTier} Available in this tier</div>
					</div>
				</>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
		return (
			<>
				<div className="border">
					<div>Tier 1</div>
					<div>Soldout</div>
					<div>Access Price: ${tiers[0].tierAccessPrice}</div>
					<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
				</div>
				<div onClick={onClickButton} className="border">
					<div>Tier 2</div>
					<div>Access Price: ${tiers[1].tierAccessPrice}</div>
					{(tiers[1].purchasesInThisTier + (tiers[0].purchasesInThisTier as number)) - numberOfExclusivePurchasesSoFar}
					/
					{tiers[1].purchasesInThisTier}
					Available in this tier
				</div>
			</>
		)
	}

	return (
		<>
			<div onClick={onClickButton} className="border">
				<div>Tier 1</div>
				<div>Access Price: ${tiers[0].tierAccessPrice}</div>
				<div>
					{(tiers[0].purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/{tiers[0].purchasesInThisTier}
					Available in this tier
				</div>
			</div>
			<div className="border">
				<div>Tier 2</div>
				<div>Tier 1 must sell out before tier 2 is accessed</div>
				<div>Access Price: ${tiers[1].tierAccessPrice}</div>
			</div>
		</>
	)
}

export default observer(TwoTiersInfo)
