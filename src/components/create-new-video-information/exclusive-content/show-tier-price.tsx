import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function ShowTierPrice(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const tierPrice = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPriceUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1].tierAccessPriceUsd, tierNumber])

	if (_.isNull(creatorClass)) return null

	return (
		<>
			{tierPrice && (
				<div className="my-2">
					Tier Price: ${tierPrice.toFixed(2)}
				</div>
			)}
		</>
	)
}

export default observer(ShowTierPrice)
