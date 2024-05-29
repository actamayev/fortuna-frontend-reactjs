import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewInstantAccessButton(props: Props) {
	const { video } = props
	const exchangeClass = useExchangeContext()
	const solanaClass = useSolanaContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(solanaClass) || _.isNull(video.priceToInstantlyAccessExclusiveContentUsd)) return false
		return solanaClass.walletBalanceUSD.get() >= video.priceToInstantlyAccessExclusiveContentUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.walletBalanceUSD.get(), video.priceToInstantlyAccessExclusiveContentUsd])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.setInstantAccessToExclusiveContentStage("review")
	}, [exchangeClass])

	if (_.isNull(video.priceToInstantlyAccessExclusiveContentUsd)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Instant Access Purchase"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewInstantAccessButton)
