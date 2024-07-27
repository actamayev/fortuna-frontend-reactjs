import { useMemo } from "react"
import { observer } from "mobx-react"
import ExclusiveContentTier from "./exclusive-content-tier"
import { useCreatorContext } from "../../../contexts/creator-context"

function ExclusiveContentTierMap() {
	const creatorClass = useCreatorContext()

	const isContentExclusive = useMemo(() => {
		return creatorClass.newVideoDetails.isContentExclusive
	}, [creatorClass.newVideoDetails.isContentExclusive])

	const tierData = useMemo(() => {
		return creatorClass.newVideoDetails.tierData
	}, [creatorClass.newVideoDetails.tierData])

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
