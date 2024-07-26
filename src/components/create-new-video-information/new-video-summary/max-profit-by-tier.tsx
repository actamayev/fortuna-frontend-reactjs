import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { SuperMoneyStyleDollars } from "../../usd-or-sol/super-money-style"

interface Props {
	tierNumber: number
}

function MaxProfitByTier(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const purchasesInThisTier = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tierNumber, creatorClass.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier])

	const tierAccessPriceUsd = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tierNumber, creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd])

	if (_.isNull(purchasesInThisTier) || tierAccessPriceUsd === 0) return null

	const { dollars, cents } = numberWithCommasFixed((purchasesInThisTier * tierAccessPriceUsd), 2)

	return (
		<div>
			Max Profit From Tier {tierNumber}: <SuperMoneyStyleDollars dollars={dollars} cents={cents} />
			&nbsp;({purchasesInThisTier} {purchasesInThisTier > 1 ? "purchases" : "purchase"} X ${tierAccessPriceUsd})
		</div>
	)
}

export default observer(MaxProfitByTier)
