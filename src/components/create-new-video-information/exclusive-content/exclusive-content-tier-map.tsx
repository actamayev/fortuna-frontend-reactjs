import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import ExclusiveContentTier from "./exclusive-content-tier"
import { useCreatorContext } from "../../../contexts/creator-context"

function ExclusiveContentTierMap() {
	const creatorClass = useCreatorContext()

	const isContentExclusive = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.newVideoDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	const tierData = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.newVideoDetails.tierData
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData])

	if (isContentExclusive === false) return null

	return (
		<div className="flex flex-wrap -mx-2">
			{tierData.map((tier) => (
				<div key={tier.tierNumber} className="w-1/3 px-2 my-2">
					<div className="border border-green-600 rounded-md p-2">
						<ExclusiveContentTier tierNumber={tier.tierNumber} />
					</div>
				</div>
			))}
		</div>
	)
}

export default observer(ExclusiveContentTierMap)
