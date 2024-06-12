import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useCallback, useMemo, useState } from "react"
import Button from "../../../button"
import usePurchaseExclusiveContentAccess from "../../../../hooks/market/purchase-exclusive-content-access"
import useConfirmUserHasEnoughSolForInstantAccess from "../../../../hooks/solana/confirm-user-has-enough-sol-for-instant-access"

interface Props {
	tierNumber: number | null
}

function ConfirmInstantAccessButton(props: Props) {
	const { tierNumber } = props
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const [isLoading, setIsLoading] = useState(false)
	const purchaseInstantAccess = usePurchaseExclusiveContentAccess()
	const confirmUserHasEnoughSolForInstantAccess = useConfirmUserHasEnoughSolForInstantAccess()

	const onClickButton = useCallback(async() => {
		if (_.isUndefined(videoUUID) || _.isNull(tierNumber)) return
		await purchaseInstantAccess(videoUUID, tierNumber, setIsLoading)
	}, [purchaseInstantAccess, tierNumber, videoUUID])

	const doesUserHaveEnoughSol = useMemo(() => {
		return confirmUserHasEnoughSolForInstantAccess(videoUUID)
	}, [confirmUserHasEnoughSolForInstantAccess, videoUUID])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-emerald-200 dark:bg-emerald-600"
			hoverClass="hover:bg-emerald-300 dark:hover:bg-emerald-700"
			title="Purchase Instant Access"
			disabled={isLoading || !doesUserHaveEnoughSol}
			className="font-semibold"
		/>
	)
}

export default observer(ConfirmInstantAccessButton)
