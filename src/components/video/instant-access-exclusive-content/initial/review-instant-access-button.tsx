import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useMarketContext } from "../../../../contexts/market-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewInstantAccessButton(props: Props) {
	const { video } = props
	const marketClass = useMarketContext()
	const solanaClass = useSolanaContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(solanaClass) || _.isNull(video.listingPriceToAccessUsd)) return false
		return solanaClass.walletBalanceUSD.get() >= video.listingPriceToAccessUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.walletBalanceUSD.get(), video.listingPriceToAccessUsd])

	const onClickButton = useCallback(() => {
		if (_.isNull(marketClass)) return
		marketClass.setInstantAccessToExclusiveContentStage("review")
	}, [marketClass])

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200 dark:bg-blue-600"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-700"
			title="Review Instant Access Purchase"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewInstantAccessButton)
