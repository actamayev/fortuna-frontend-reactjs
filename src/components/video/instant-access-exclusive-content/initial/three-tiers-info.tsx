import _ from "lodash"
import { observer } from "mobx-react"
import useClickTiersButton from "../../../../hooks/market/click-tiers-button"
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
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)
	const clickTiersButton = useClickTiersButton(video)

	if (
		_.isUndefined(firstTier) ||
		_.isUndefined(secondTier) ||
		_.isUndefined(thirdTier) ||
		_.isNull(video.numberOfExclusivePurchasesSoFar)
	) return null

	return (
		<ThreeTiersTemplate
			onClick={clickTiersButton}
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
