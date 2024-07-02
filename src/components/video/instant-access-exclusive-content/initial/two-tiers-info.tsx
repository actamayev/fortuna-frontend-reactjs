import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"
import TwoTiersTemplate from "../../video-tiers/tiers-templates/two-tiers-template"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	video: SingleVideoDataFromBackend
}

function TwoTiersInfo(props: Props) {
	const { video } = props
	const firstTier = getTierByTierNumber(video.tierData, 1)
	const secondTier = getTierByTierNumber(video.tierData, 2)
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)

	const onClickButton = useCallback(() => {
		if (
			_.isNull(marketClass) ||
			secondTier?.isTierSoldOut === true ||
			doesUserHaveAccessToExclusiveContent === true
		) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [doesUserHaveAccessToExclusiveContent, marketClass, secondTier?.isTierSoldOut])

	if (
		_.isUndefined(firstTier) ||
		_.isUndefined(secondTier) ||
		_.isNull(video.numberOfExclusivePurchasesSoFar)
	) return null

	return (
		<TwoTiersTemplate
			onClick={onClickButton}
			firstTier={firstTier}
			secondTier={secondTier}
			numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={video.uuid}
		/>
	)
}

export default observer(TwoTiersInfo)
