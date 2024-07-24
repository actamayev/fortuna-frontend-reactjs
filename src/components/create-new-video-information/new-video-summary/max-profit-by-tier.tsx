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
		if (_.isNull(creatorClass)) return null
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tierNumber, creatorClass?.newVideoDetails.tierData[tierNumber - 1]?.purchasesInThisTier])

	const tierAccessPriceUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tierNumber, creatorClass?.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd])

	if (_.isNull(purchasesInThisTier) || tierAccessPriceUsd === 0) return null

	const { dollars, cents } = numberWithCommasFixed((purchasesInThisTier * tierAccessPriceUsd), 2)

	return (
		<div>
			Max Profit From Tier {tierNumber}:
			<SuperMoneyStyleDollars dollars={dollars} cents={cents} />
			&nbsp;({purchasesInThisTier}&nbsp;
			purchase{purchasesInThisTier > 1 ? "s" : ""}&nbsp;
			X&nbsp; ${tierAccessPriceUsd})
		</div>
	)
}

export default observer(MaxProfitByTier)
