import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"
import { SuperMoneyStyleDollars } from "../../usd-or-sol/super-money-style"
import { useNumberWithCommasFixed } from "../../../hooks/numbers/numbers-with-commas"

interface Props {
	tierNumber: number
}

function MaxProfitByTier(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()
	const numberWithCommasFixed = useNumberWithCommasFixed()

	const purchasesInThisTier = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier || -1
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tierNumber, creatorClass.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier])

	const tierAccessPriceUsd = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tierNumber, creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd])

	const { dollars, cents } = numberWithCommasFixed((purchasesInThisTier * tierAccessPriceUsd), 2)

	if ((purchasesInThisTier <= 0 ) || tierAccessPriceUsd === 0) return null

	return (
		<div>
			Max Profit From Tier {tierNumber}: <SuperMoneyStyleDollars dollars={dollars} cents={cents} />
			&nbsp;({purchasesInThisTier} {purchasesInThisTier > 1 ? "purchases" : "purchase"} X ${tierAccessPriceUsd})
		</div>
	)
}

export default observer(MaxProfitByTier)
