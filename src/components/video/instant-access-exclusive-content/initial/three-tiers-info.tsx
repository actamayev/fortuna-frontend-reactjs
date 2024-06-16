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
function ThreeTiersInfo(props: Props) {
	const { tiers, numberOfExclusivePurchasesSoFar } = props
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const firstTier = getTierByTierNumber(tiers, 1)
	const secondTier = getTierByTierNumber(tiers, 2)
	const thirdTier = getTierByTierNumber(tiers, 3)
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

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier) || _.isUndefined(thirdTier)) return null

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
						<ShowUserPurchasedContentMessage />
					</div>
				)
			}

			// This is if the third tier has not purchase limit
			if (_.isNull(thirdTier.purchasesInThisTier)) {
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
						<ShowUserPurchasedContentMessage />
					</div>
				)
			}

			// First two tiers are soldout, third is avaialable
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
					<ShowUserPurchasedContentMessage />
				</div>
			)
		}

		// First tier is soldout, 2 and 3 are available
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
						numberOfPurchasesInThisTierSoFar={
							((firstTier.purchasesInThisTier as number) + (secondTier.purchasesInThisTier as number)) -
						numberOfExclusivePurchasesSoFar
						}
					/>
					<TierProgressBar
						isActive={false}
						tier={thirdTier}
						numberOfPurchasesInThisTierSoFar={0}
					/>
				</div>
				<ShowUserPurchasedContentMessage />
			</div>
		)
	}

	// All three tiers are available
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
				<TierProgressBar
					isActive={false}
					tier={thirdTier}
					numberOfPurchasesInThisTierSoFar={0}
				/>
			</div>
			<ShowUserPurchasedContentMessage />
		</div>
	)
}

export default observer(ThreeTiersInfo)
