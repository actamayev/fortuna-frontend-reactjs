import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useMarketContext } from "../../../../contexts/market-context"
import TwoTiersTemplate from "../../video-tiers/tiers-templates/two-tiers-template"
import getTierByTierNumber from "../../../../utils/video-access-tiers/get-tier-by-tier-number"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	tiers: TierDataFromDB[]
	numberOfExclusivePurchasesSoFar: number
}

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

	if (_.isUndefined(firstTier) || _.isUndefined(secondTier) || _.isUndefined(videoUUID)) return null

	return (
		<TwoTiersTemplate
			onClick={onClickButton}
			firstTier={firstTier}
			secondTier={secondTier}
			numberOfExclusivePurchasesSoFar={numberOfExclusivePurchasesSoFar}
			doesUserHaveAccessToExclusiveContent={doesUserHaveAccessToExclusiveContent}
			uuid={videoUUID}
		/>
	)
}

export default observer(TwoTiersInfo)
