/* eslint-disable react-hooks/exhaustive-deps */
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
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	const tierData = useMemo(() => {
		if (_.isNull(creatorClass)) return []
		return creatorClass.newVideoDetails.tierData
	}, [creatorClass, creatorClass?.newVideoDetails.tierData])

	if (isContentExclusive === false) return null

	return (
		<div>
			{tierData.map((tier) => (
				<div key={tier.tierNumber} className="border border-green-600 my-2 rounded-md">
					<ExclusiveContentTier tierNumber={tier.tierNumber} />
				</div>
			))}
		</div>
	)
}

export default observer(ExclusiveContentTierMap)
