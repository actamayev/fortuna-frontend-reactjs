import _ from "lodash"
import { observer } from "mobx-react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

function PricePerShareArea(props: Props) {
	const { video } = props
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) {
		return <>${_.round(video.offeringSharePriceUsd, 2)}/Share</>
	}
	return (
		<>
			{personalInfoClass.getDefaultCurrency() === "sol" && (<>{_.round(video.offeringSharePriceSol, 4)} SOL/Share</>)}
			{personalInfoClass.getDefaultCurrency() === "usd" && (<>${_.round(video.offeringSharePriceUsd, 2)}/Share</>)}
		</>
	)
}

export default observer(PricePerShareArea)
