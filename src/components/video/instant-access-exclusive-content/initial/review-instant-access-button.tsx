import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useMarketContext } from "../../../../contexts/market-context"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewInstantAccessButton(props: Props) {
	const { video } = props
	const marketClass = useMarketContext()
	const solanaClass = useSolanaContext()

	const isAbleToPurchaseAccessToContent = useMemo(() => {
		const tierAccessPriceUsdUsd = getTieredAccessPriceUsd(video)
		if (_.isNull(solanaClass) || _.isNull(tierAccessPriceUsdUsd)) return false
		return solanaClass.walletBalanceUSD.get() >= tierAccessPriceUsdUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.walletBalanceUSD.get(), video])

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
			disabled={!isAbleToPurchaseAccessToContent}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewInstantAccessButton)
