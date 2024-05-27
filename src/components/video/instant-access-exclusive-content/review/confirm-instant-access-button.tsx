import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import usePurchaseInstantAccess from "../../../../hooks/exchange/purchase-instant-access"

function ConfirmInstantAccessButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const purchaseInstantAccess = usePurchaseInstantAccess()

	const onClickButton = useCallback(() => {
		if (_.isUndefined(videoUUID)) return
		purchaseInstantAccess(videoUUID, setIsLoading)
	}, [purchaseInstantAccess, videoUUID])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Confirm Instant Access Purchase"
			disabled={isLoading}
			className="font-semibold"
		/>
	)
}

export default observer(ConfirmInstantAccessButton)
