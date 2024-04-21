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
		<div className="flex justify-center mt-2">
			<Button
				onClick={() => purchaseSplTokens(setIsLoading, videoUUID)}
				colorClass="bg-emerald-200"
				hoverClass="hover:bg-emerald-300"
				title="Confirm Purchase"
				disabled={isLoading}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ConfirmPurchaseButton)
