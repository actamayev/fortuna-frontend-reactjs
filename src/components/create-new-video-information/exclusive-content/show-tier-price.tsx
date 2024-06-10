import _ from "lodash"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function ShowTierPrice(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	if (_.isNull(creatorClass)) return null
	const tierPrice = creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPrice

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
