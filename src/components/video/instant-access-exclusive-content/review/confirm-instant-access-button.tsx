import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import Button from "../../../buttons/button"
import usePurchaseExclusiveContentAccess from "../../../../hooks/market/purchase-exclusive-content-access"
import getCurrentExclusiveAccessTier from "../../../../utils/video-access-tiers/get-current-exclusive-access-tier"
import useConfirmSufficientFundsForInstantAccess from "../../../../hooks/solana/confirm-sufficient-funds-for-instant-access"

interface Props {
	video: UrlExtendedSingleVideoData
}

function ConfirmInstantAccessButton(props: Props) {
	const { video } = props
	const [isLoading, setIsLoading] = useState(false)
	const purchaseInstantAccess = usePurchaseExclusiveContentAccess()
	const confirmSufficientFundsForInstantAccess = useConfirmSufficientFundsForInstantAccess()
	const tierNumber = getCurrentExclusiveAccessTier(video)

	const onClickButton = useCallback(async() => {
		if (_.isUndefined(video.uuid) || _.isNull(tierNumber)) return
		await purchaseInstantAccess(video, tierNumber, setIsLoading)
	}, [purchaseInstantAccess, tierNumber, video])

	const doesUserHaveSufficientFunds = useMemo(() => {
		return confirmSufficientFundsForInstantAccess(video.uuid)
	}, [confirmSufficientFundsForInstantAccess, video.uuid])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-emerald-300 dark:bg-emerald-400"
			hoverClass="hover:bg-emerald-400 dark:hover:bg-emerald-500"
			title="Purchase Instant Access"
			disabled={isLoading || !doesUserHaveSufficientFunds}
			className="font-semibold text-zinc-950"
		/>
	)
}

export default observer(ConfirmInstantAccessButton)
