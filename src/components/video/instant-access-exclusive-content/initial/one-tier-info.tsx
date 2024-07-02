import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useMarketContext } from "../../../../contexts/market-context"
import OneTierTemplate from "../../video-tiers/tiers-templates/one-tier-template"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
}

function OneTierInfo(props: Props) {
	const { tier, numberOfExclusivePurchasesSoFar } = props
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const marketClass = useMarketContext()
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(videoUUID)

	const onClickButton = useCallback(() => {
		if (
			_.isNull(marketClass) ||
			tier.isTierSoldOut === true ||
			doesUserHaveAccessToExclusiveContent === true
		) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [doesUserHaveAccessToExclusiveContent, marketClass, tier.isTierSoldOut])

	if (_.isUndefined(videoUUID)) return null

	return (
		<OneTierTemplate
			onClick={onClickButton}
			tier={tier}
			numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={videoUUID}
		/>
	)
}

export default observer(OneTierInfo)
