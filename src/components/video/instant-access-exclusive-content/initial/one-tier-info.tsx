import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import TierProgressBar from "./tier-progress-bar"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tier: TierDataFromDB
	numberOfExclusivePurchasesSoFar: number
}

function OneTierInfo(props: Props) {
	const { tier, numberOfExclusivePurchasesSoFar } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass) || tier.isTierSoldOut === true) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass, tier.isTierSoldOut])

	return (
		<div
			onClick={onClickButton}
			style={{ cursor: tier.isTierSoldOut ? "" : "pointer" }}
		>
			<TierProgressBar
				tier={tier}
				isActive={true}
				numberOfPurchasesInThisTierSoFar={numberOfExclusivePurchasesSoFar}
			/>
		</div>
	)
}

export default observer(OneTierInfo)
