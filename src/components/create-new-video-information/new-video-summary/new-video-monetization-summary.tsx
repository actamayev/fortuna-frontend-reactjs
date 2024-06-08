import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import Tooltip from "../../tooltip"
import MaxProfitFromVideo from "./max-profit-from-video"
import { useCreatorContext } from "../../../contexts/creator-context"

function NewVideoMonetizationSummary() {
	const creatorClass = useCreatorContext()

	const isNewVideoExclusive = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.newVideoDetails.isContentExclusive
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.isContentExclusive])

	if (isNewVideoExclusive === false) return null

	return (
		<div className = "bg-white dark:bg-zinc-800 border rounded-lg w-full dark:border-b-2 p-2">
			<h1 className = "flex text-xl text-center font-semibold leading-none tracking-tight mb-3">
				Video Monetization Summary
			</h1>
			<div className="flex">
				Pegging to USD
				<div className="ml-2">
					<Tooltip
						message="The USD value of accessing this video will not change with Solana's price fluctuations"
						width="275px"
						messageStart="center"
					>
					ℹ️
					</Tooltip>
				</div>
			</div>
			<MaxProfitFromVideo />
		</div>
	)
}

export default observer(NewVideoMonetizationSummary)
