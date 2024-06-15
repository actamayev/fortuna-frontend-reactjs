import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import TierProgressBar from "./tier-progress-bar/tier-progress-bar"
import { useMarketContext } from "../../../../contexts/market-context"
import ShowUserPurchasedContentMessage from "./show-user-purchased-content-message"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

// eslint-disable-next-line max-lines-per-function, complexity
function TwoTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(videoUUID)

	const onClickButton = useCallback(() => {
		if (
			_.isNull(marketClass) ||
			secondTier?.isTierSoldOut === true ||
			doesUserHaveAccessToExclusiveContent === true
		) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [doesUserHaveAccessToExclusiveContent, marketClass, secondTier?.isTierSoldOut])

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier)) return null

	// This is if the first tier is soldout:
	if ((firstTier.isTierSoldOut === true)) {
		// This is if the first tier is soldout, and the second tier has no purchase limit:
		if (_.isNull(secondTier.purchasesInThisTier)) {
			return (
				<div>
					<div
						onClick={onClickButton}
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
					<ShowUserPurchasedContentMessage />
				</div>
			)
		}
		// This is if both tiers are soldout
		if (numberOfExclusivePurchasesSoFar >= ((firstTier.purchasesInThisTier as number) + secondTier.purchasesInThisTier)) {
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
					<ShowUserPurchasedContentMessage />
				</div>
			)
		}

		// This is if tier 1 has soldout, but tier 2 still has availbility
		return (
			<div>
				<div
					onClick={onClickButton}
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
				<ShowUserPurchasedContentMessage />
			</div>
		)
	}

	return (
		<div>
			<div
				onClick={onClickButton}
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
			<ShowUserPurchasedContentMessage />
		</div>
	)
}

export default observer(TwoTiersInfo)
