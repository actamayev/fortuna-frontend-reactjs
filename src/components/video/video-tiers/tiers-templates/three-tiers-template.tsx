import _ from "lodash"
import { observer } from "mobx-react"
import TierProgressBar from "../tier-progress-bar/tier-progress-bar"

interface Props {
	onClick: () => void
	firstTier: TierDataFromDB
	secondTier: TierDataFromDB
	thirdTier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
	doesUserHaveAccessToExclusiveContent: boolean
	uuid: string
}

// eslint-disable-next-line max-lines-per-function
function ThreeTiersTemplate(props: Props) {
	const {
		onClick,
		firstTier,
		secondTier,
		thirdTier,
		numberOfExclusivePurchasesSoFar,
		doesUserHaveAccessToExclusiveContent,
	} = props

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

			// This is if the third tier has no purchase limit
			if (_.isNull(thirdTier.purchasesInThisTier)) {
				return (
					<div>
						<div
							onClick={onClick}
							style={{ cursor: doesUserHaveAccessToExclusiveContent ? "" : "pointer" }}
						>
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
					</div>
				)
			}

			// First two tiers are soldout, third is avaialable
			return (
				<div>
					<div
						onClick={onClick}
						style={{ cursor: doesUserHaveAccessToExclusiveContent ? "" : "pointer" }}
					>
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
				</div>
			)
		}

		// First tier is soldout, 2 and 3 are available
		return (
			<div>
				<div
					onClick={onClick}
					style={{ cursor: doesUserHaveAccessToExclusiveContent ? "" : "pointer" }}
				>
					<TierProgressBar
						isActive={false}
						tier={firstTier}
						numberOfPurchasesInThisTierSoFar={firstTier.purchasesInThisTier}
					/>
					<TierProgressBar
						isActive={true}
						tier={secondTier}
						numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar - (firstTier.purchasesInThisTier as number)}
					/>
					<TierProgressBar
						isActive={false}
						tier={thirdTier}
						numberOfPurchasesInThisTierSoFar={0}
					/>
				</div>
			</div>
		)
	}

	// All three tiers are available
	return (
		<div>
			<div
				onClick={onClick}
				style={{ cursor: doesUserHaveAccessToExclusiveContent ? "" : "pointer" }}
			>
				<TierProgressBar
					isActive={true}
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
		</div>
	)
}

export default observer(ThreeTiersTemplate)
