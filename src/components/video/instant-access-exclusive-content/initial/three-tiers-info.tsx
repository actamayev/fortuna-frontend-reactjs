import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

// eslint-disable-next-line max-lines-per-function
function ThreeTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	// This is if the first tier is soldout:
	if (tiers[0].isTierSoldOut === true) {
		// This is if both the first and second tier are sold out
		if (tiers[1].isTierSoldOut === true) {
			// This is if the third tier has not purchase limit
			if (_.isNull(tiers[2].purchasesInThisTier)) {
				return (
					<>
						<div className="border">
							<div>Tier 1</div>
							<div>Soldout</div>
							<div>Access Price: ${tiers[0].tierAccessPrice}</div>
							<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
						</div>
						<div className="border">
							<div>Tier 2 </div>
							<div>Soldout</div>
							<div>Access Price: ${tiers[1].tierAccessPrice}</div>
							<div>0/{tiers[1].purchasesInThisTier} Available in this tier</div>
						</div>
						<div onClick={onClickButton} className="border">
							<div>Tier 3 </div>
							Access Price: ${tiers[2].tierAccessPrice}
						</div>
					</>
				)
			}

			// All three are soldout
			if (tiers[2].isTierSoldOut === true) {
				return (
					<>
						<div className="border">
							<div>Tier 1</div>
							<div>Soldout</div>
							<div>Access Price: ${tiers[0].tierAccessPrice}</div>
							<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
						</div>
						<div className="border">
							<div>Tier 2 </div>
							<div>Soldout</div>
							<div>Access Price: ${tiers[1].tierAccessPrice}</div>
							<div>0/{tiers[1].purchasesInThisTier} Available in this tier</div>
						</div>
						<div className="border">
							<div>Tier 3 </div>
							<div>Soldout</div>
							<div>Access Price: ${tiers[2].tierAccessPrice}</div>
							<div>0/{tiers[2].purchasesInThisTier} Available in this tier</div>
						</div>
					</>
				)
			}

			// First two tiers are soldout, third is avaialable
			return (
				<>
					<div className="border">
						<div>Tier 1 </div>
						<div>Soldout</div>
						<div>Access Price: ${tiers[0].tierAccessPrice}</div>
						<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
					</div>
					<div className="border">
						<div>Tier 2 </div>
						<div>Soldout</div>
						<div>Access Price: ${tiers[1].tierAccessPrice}</div>
						<div>0/{tiers[1].purchasesInThisTier} Available in this tier</div>
					</div>
					<div onClick={onClickButton} className="border">
						<div>Tier 2 </div>
						<div>Access Price: ${tiers[1].tierAccessPrice}</div>
						{
							(tiers[2].purchasesInThisTier +
							(tiers[1].purchasesInThisTier as number) +
							(tiers[0].purchasesInThisTier as number)) -
							numberOfExclusivePurchasesSoFar
						}
						/
						{tiers[1].purchasesInThisTier}
						Available in this tier
					</div>
				</>
			)
		}

		// First tier is soldout, 2 and 3 are avaialebl
		return (
			<>
				<div className="border">
					<div>Tier 1 </div>
					<div>Soldout</div>
					<div>Access Price: ${tiers[0].tierAccessPrice}</div>
					<div>0/{tiers[0].purchasesInThisTier} Available in this tier</div>
				</div>
				<div onClick={onClickButton} className="border">
					<div>Tier 2 </div>
					<div>Access Price: ${tiers[1].tierAccessPrice}</div>
					<div>
						{(tiers[1].purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/{tiers[1].purchasesInThisTier}
						Available in this tier
					</div>
				</div>
				<div className="border">
					<div>Tier 3 </div>
					<div>Tier 2 must sell out before tier 3 is accessed</div>
					<div>Access Price: ${tiers[2].tierAccessPrice}</div>
				</div>
			</>
		)
	}

	// All three tiers are available
	return (
		<>
			<div onClick={onClickButton} className="border">
				<div>Tier 1 </div>
				<div>Access Price: ${tiers[0].tierAccessPrice}</div>
				<div>
					{(tiers[0].purchasesInThisTier as number) - numberOfExclusivePurchasesSoFar}/{tiers[0].purchasesInThisTier}
					Available in this tier
				</div>
			</div>
			<div className="border">
				<div>Tier 2 </div>
				<div>Tier 1 must sell out before tier 2 is accessed</div>
				<div>Access Price: ${tiers[1].tierAccessPrice}</div>
			</div>
			<div className="border">
				<div>Tier 3 </div>
				<div>Tier 2 must sell out before tier 3 is accessed</div>
				<div>Access Price: ${tiers[2].tierAccessPrice}</div>
			</div>
		</>
	)
}

export default observer(ThreeTiersInfo)
