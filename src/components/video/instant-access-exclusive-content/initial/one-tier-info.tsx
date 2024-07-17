import _ from "lodash"
import { observer } from "mobx-react"
import useClickTiersButton from "../../../../hooks/market/click-tiers-button"
import OneTierTemplate from "../../video-tiers/tiers-templates/one-tier-template"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	video: UrlExtendedSingleVideoData
}

function OneTierInfo(props: Props) {
	const { video } = props
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)
	const clickTiersButton = useClickTiersButton(video)

	if (_.isNull(video.numberOfExclusivePurchasesSoFar)) return null

	return (
		<OneTierTemplate
			onClick={clickTiersButton}
			tier={video.tierData[0]}
			numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={video.uuid}
		/>
	)
}

export default observer(OneTierInfo)
