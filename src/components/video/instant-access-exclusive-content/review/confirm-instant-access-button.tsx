import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useCallback, useMemo, useState } from "react"
import Button from "../../../buttons/button"
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
			colorClass="bg-emerald-300 dark:bg-emerald-400"
			hoverClass="hover:bg-emerald-400 dark:hover:bg-emerald-500"
			title="Purchase Instant Access"
			disabled={isLoading || !doesUserHaveEnoughSol}
			className="font-semibold text-zinc-950"
		/>
	)
}

export default observer(ConfirmInstantAccessButton)
