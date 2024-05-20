import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../../../../button"
import useBidForSecondarySplTokens from "../../../../../hooks/exchange/spl-token-bid"

function ConfirmBidButton() {
	const [isLoading, setIsLoading] = useState(false)
	const splTokenBid = useBidForSecondarySplTokens()

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
