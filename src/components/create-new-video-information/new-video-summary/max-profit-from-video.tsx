import _ from "lodash"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../../contexts/creator-context"

function MaxProfitFromVideo() {
	const creatorClass = useCreatorContext()

	if (_.isNull(creatorClass)) return null

	return (
		<>
			Max Profit: ${creatorClass.maxProfitFromNewVideo}
		</>
	)
}

export default observer(MaxProfitFromVideo)
