import _ from "lodash"
import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import usePurchasePrimarySplTokens from "../../../../hooks/exchange/purchase-primary-spl-tokens"

function ConfirmPrimaryPurchaseButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const purchaseSplTokens = usePurchasePrimarySplTokens()

	const purchaseSplTokensHook = useCallback(() => {
		if (_.isUndefined(videoUUID)) return
		purchaseSplTokens(setIsLoading, videoUUID)
	}, [purchaseSplTokens, videoUUID])

	return (
		<Button
			onClick={purchaseSplTokensHook}
			colorClass="bg-emerald-200"
			hoverClass="hover:bg-emerald-300"
			title="Confirm Purchase"
			disabled={isLoading}
			className="font-semibold"
		/>
	)
}

export default observer(ConfirmPrimaryPurchaseButton)
