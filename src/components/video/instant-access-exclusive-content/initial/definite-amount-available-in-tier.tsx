import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	tierNumber: number
	tierAccessPrice: number
	numberPurchasesAvailable: string
}

function DefiniteAmountAvailableInTier(props: Props) {
	const { tierNumber, tierAccessPrice, numberPurchasesAvailable } = props
	const marketClass = useMarketContext()

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	return (
		<div onClick={onClickButton} className="border cursor-pointer">
			<div>Tier {tierNumber}</div>
			<div>Access Price: <ShowUsdOrSolPrice usdAmount={tierAccessPrice} /> </div>
			<div>{numberPurchasesAvailable} Available in this tier</div>
		</div>
	)
}

export default observer(DefiniteAmountAvailableInTier)
