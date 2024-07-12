import { observer } from "mobx-react"
import TierProgressBar from "../tier-progress-bar/tier-progress-bar"

interface Props {
	onClick: () => void
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
	doesUserHaveAccessToExclusiveContent: boolean
	uuid: string
}

function OneTierTemplate(props: Props) {
	const { onClick, tier, numberOfExclusivePurchasesSoFar, doesUserHaveAccessToExclusiveContent } = props

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
		</div>
	)
}

export default observer(OneTierTemplate)
