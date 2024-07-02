import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../../contexts/market-context"
import OneTierTemplate from "../../video-tiers/tiers-templates/one-tier-template"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	video: SingleVideoDataFromBackend
}

function OneTierInfo(props: Props) {
	const { video } = props
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)

	const onClickButton = useCallback(() => {
		if (
			_.isNull(marketClass) ||
			video.tierData[0].isTierSoldOut === true ||
			doesUserHaveAccessToExclusiveContent === true
		) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [doesUserHaveAccessToExclusiveContent, marketClass, video.tierData])

	if (_.isNull(video.numberOfExclusivePurchasesSoFar)) return null

	return (
		<OneTierTemplate
			onClick={onClickButton}
			tier={video.tierData[0]}
			numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={video.uuid}
		/>
	)
}

export default observer(OneTierInfo)
