import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"
import ThreeTiersTemplate from "../../video-tiers/tiers-templates/three-tiers-template"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	video: SingleVideoDataFromBackend
}

function ThreeTiersInfo(props: Props) {
	const { video } = props
	const firstTier = getTierByTierNumber(video.tierData, 1)
	const secondTier = getTierByTierNumber(video.tierData, 2)
	const thirdTier = getTierByTierNumber(video.tierData, 3)
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)

	const onClickButton = useCallback(() => {
		if (
			_.isNull(marketClass) ||
			thirdTier?.isTierSoldOut === true ||
			doesUserHaveAccessToExclusiveContent === true
		) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [doesUserHaveAccessToExclusiveContent, marketClass, thirdTier?.isTierSoldOut])

	if (
		_.isUndefined(firstTier) ||
		_.isUndefined(secondTier) ||
		_.isUndefined(thirdTier) ||
		_.isNull(video.numberOfExclusivePurchasesSoFar)
	) return null

	return (
		<ThreeTiersTemplate
			onClick={onClickButton}
			firstTier={firstTier}
			secondTier={secondTier}
			thirdTier={thirdTier}
			numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={video.uuid}
		/>
	)
}

export default observer(ThreeTiersInfo)
