import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import numberWithCommas from "../../../utils/numbers-with-commas"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function MaxProfitByTier(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const purchasesInThisTier = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tierNumber, creatorClass?.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier])

	if (
		_.isNull(creatorClass) ||
		_.isNull(purchasesInThisTier)
	) return null

	return (
		<div>
			Max Profit From Tier {tierNumber}: ${numberWithCommas(_.round(creatorClass.getProfitByVideoTier(tierNumber) || 0, 3))} {" "}
			({purchasesInThisTier} {" "}
			purchase{purchasesInThisTier > 1 ? "s" : ""}
			{" "} X {" "}
			{(100 - creatorClass.newVideoDetails.tierData[tierNumber - 1].tierDiscount) / 100} X {" "}
			${creatorClass.lowestTierPrice})
		</div>
	)
}

export default observer(MaxProfitByTier)
