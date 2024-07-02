import _ from "lodash"
import { observer } from "mobx-react"
import TierProgressBar from "../tier-progress-bar/tier-progress-bar"
import ShowUserPurchasedContentMessage from "../../instant-access-exclusive-content/initial/show-user-purchased-content-message"

interface Props {
	onClick: () => void
	firstTier: TierDataFromDB
	secondTier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
	doesUserHaveAccessToExclusiveContent: boolean
	uuid: string
}

// eslint-disable-next-line max-lines-per-function
function TwoTiersTemplate(props: Props) {
	const {
		onClick,
		firstTier,
		secondTier,
		numberOfExclusivePurchasesSoFar,
		doesUserHaveAccessToExclusiveContent,
		uuid
	} = props

	if ((firstTier.isTierSoldOut === true)) {
		// This is if both tiers are soldout
		if (secondTier.isTierSoldOut === true) {
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
					<ShowUserPurchasedContentMessage uuid={uuid}/>
				</div>
			)
		}

		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(secondTier.purchasesInThisTier)) {
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
							numberOfPurchasesInThisTierSoFar={secondTier.purchasesInThisTier}
						/>
					</div>
					<ShowUserPurchasedContentMessage uuid={uuid}/>
				</div>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
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
				</div>
				<ShowUserPurchasedContentMessage uuid={uuid}/>
			</div>
		)
	}

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
			</div>
			<ShowUserPurchasedContentMessage uuid={uuid}/>
		</div>
	)
}

export default observer(TwoTiersTemplate)
