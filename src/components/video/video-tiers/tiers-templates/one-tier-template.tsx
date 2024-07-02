import { observer } from "mobx-react"
import TierProgressBar from "../tier-progress-bar/tier-progress-bar"
import ShowUserPurchasedContentMessage from "../../instant-access-exclusive-content/initial/show-user-purchased-content-message"

interface Props {
	onClick: () => void
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
	doesUserHaveAccessToExclusiveContent: boolean
	uuid: string
}

function OneTierTemplate(props: Props) {
	const { onClick, tier, numberOfExclusivePurchasesSoFar, doesUserHaveAccessToExclusiveContent, uuid } = props

	return (
		<div>
			<div
				onClick={onClick}
				style={{ cursor: (tier.isTierSoldOut || doesUserHaveAccessToExclusiveContent) ? "" : "pointer" }}
			>
				<TierProgressBar
					tier={tier}
					isActive={true}
					numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar}
				/>
			</div>
			<ShowUserPurchasedContentMessage uuid = {uuid}/>
		</div>
	)
}

export default observer(OneTierTemplate)
