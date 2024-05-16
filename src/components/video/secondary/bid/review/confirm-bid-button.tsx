import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../../../button"
import useBidForSecondarySplTokens from "../../../../../hooks/exchange/bid-for-secondary-spl-tokens"

function ConfirmBidButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const bidForSecondarySplTokens = useBidForSecondarySplTokens()

	if (_.isUndefined(videoUUID)) return null

	return (
		<div className="flex justify-center mt-2">
			<Button
				onClick={() => bidForSecondarySplTokens(setIsLoading)}
				colorClass="bg-emerald-200"
				hoverClass="hover:bg-emerald-300"
				title="Confirm Bid"
				disabled={isLoading}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ConfirmBidButton)
