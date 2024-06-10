import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tierNumber: number
	tierData: TierDataFromDB
}

function IndefiniteAmountAvailableInTier(props: Props) {
	const { tierNumber, tierData } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	return (
		<div onClick={onClickButton} className="border cursor-pointer">
			<div>Tier {tierNumber}</div>
			<div>Access Price: {" "}
				<ShowUsdOrSolPrice usdAmount={tierData.tierAccessPrice }/>
			</div>
		</div>
	)
}

export default observer(IndefiniteAmountAvailableInTier)
