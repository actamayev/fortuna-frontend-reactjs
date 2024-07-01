import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function ShowTierDiscount(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const tierAccessPriceUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPriceUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd, tierNumber])

	const previousTierAccessPriceUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return null
		return creatorClass.newVideoDetails.tierData[tierNumber]?.tierAccessPriceUsd || null
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber]?.tierAccessPriceUsd, tierNumber])

	if (_.isNull(previousTierAccessPriceUsd)) return null

	const impliedTierDiscount = 100 * (previousTierAccessPriceUsd - tierAccessPriceUsd) / (previousTierAccessPriceUsd)

	if (impliedTierDiscount <= 0) return null

	return (
		<>
			{" "} ({impliedTierDiscount.toFixed(2)}% discount relative to tier {tierNumber + 1})
		</>
	)
}

export default observer(ShowTierDiscount)
