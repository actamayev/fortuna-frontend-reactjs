import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../../../button"
import useBidForSecondarySplTokens from "../../../../../hooks/exchange/spl-token-bid"

function ConfirmBidButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const splTokenBid = useBidForSecondarySplTokens()

	if (_.isUndefined(videoUUID)) return null

	return (
		<Button
			onClick={() => splTokenBid(setIsLoading)}
			colorClass="bg-emerald-200"
			hoverClass="hover:bg-emerald-300"
			title="Confirm Bid"
			disabled={isLoading}
			className="font-semibold"
		/>
	)
}

export default observer(ConfirmBidButton)
