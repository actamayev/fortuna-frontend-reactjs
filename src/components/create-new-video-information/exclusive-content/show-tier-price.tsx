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
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPrice
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1].tierAccessPrice, tierNumber])

	return (
		<div className="my-2">
			<div>Tier Price: ${tierPrice.toFixed(2)}</div>
		</div>
	)
}

export default observer(ShowTierPrice)
