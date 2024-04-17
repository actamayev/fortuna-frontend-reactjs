import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import usePurchaseSplTokens from "../../../hooks/solana/purchase-spl-tokens/purchase-spl-tokens"

function ConfirmPurchaseButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const purchaseSplTokens = usePurchaseSplTokens()
	const [isLoading, setIsLoading] = useState(false)

	if (_.isUndefined(videoUUID)) return null

	return (
		<Button
			onClick={() => purchaseSplTokens(setIsLoading, videoUUID)}
			colorClass="bg-blue-400"
			hoverClass="hover:bg-blue-500"
			title="Confirm Purchase"
			disabled={isLoading}
		/>
	)
}

export default observer(ConfirmPurchaseButton)
