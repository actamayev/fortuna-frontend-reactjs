import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import { useAuthContext } from "../../../contexts/auth-context"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	maxSharesAvailableToPurchase: number
}

function ReviewPurchaseButton(props: Props) {
	const { maxSharesAvailableToPurchase } = props
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const solanaClass = useSolanaContext()
	const videoClass = useVideoContext()
	const authClass = useAuthContext()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return true
		return solanaClass.checkIfUuidExistsInContent(videoUUID)
	}, [solanaClass, videoUUID])

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return false
		return solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing <= maxSharesAvailableToPurchase
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maxSharesAvailableToPurchase, solanaClass?.purchaseSplSharesDetails.numberOfTokensPurchasing, videoUUID])

	const onClickButton = useCallback(() => {
		if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.contextForVideo(videoUUID)
		if (_.isUndefined(video)) return
		solanaClass.updatePurchaseSplSharesDetails("purchaseStage", "review")
		solanaClass.updatePurchaseSplSharesDetails("splPublicKey", video.splPublicKey)
	}, [solanaClass, videoClass, videoUUID])

	const createTitleForButton = useMemo(() => {
		if (_.isNull(authClass.accessToken)) return "Please Create an Account with Fortuna to purchase shares"
		if (wasVideoCreatedByUser === true) return "Unable to purchase own shares"
		else if (isAbleToPurchaseShares === false) return "Unable to purchase shares"
		return "Review Purchase"
	}, [authClass.accessToken, isAbleToPurchaseShares, wasVideoCreatedByUser])

	if (_.isNull(solanaClass)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-300"
			hoverClass="hover:bg-blue-400"
			title={createTitleForButton}
			disabled={
				wasVideoCreatedByUser ||
				!isAbleToPurchaseShares ||
				solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing === 0
			}
		/>
	)
}

export default observer(ReviewPurchaseButton)
