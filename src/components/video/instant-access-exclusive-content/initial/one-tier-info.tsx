import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import TierProgressBar from "./tier-progress-bar/tier-progress-bar"
import { useMarketContext } from "../../../../contexts/market-context"
import ShowUserPurchasedContentMessage from "./show-user-purchased-content-message"
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

	return (
		<div>
			<div
				onClick={onClickButton}
				style={{ cursor: (tier.isTierSoldOut || doesUserHaveAccessToExclusiveContent) ? "" : "pointer" }}
			>
				<TierProgressBar
					tier={tier}
					isActive={true}
					numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar}
				/>
			</div>
			<ShowUserPurchasedContentMessage />
		</div>
	)
}

export default observer(OneTierInfo)
