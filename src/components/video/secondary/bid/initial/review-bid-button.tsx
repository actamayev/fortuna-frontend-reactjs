import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../../button"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ReviewBidButton() {
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isNull(solanaClass)) return false
		if (exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd === 0) return false
		// eslint-disable-next-line max-len
		const sharePurchaseValueUsd = exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor * exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd
		return sharePurchaseValueUsd < solanaClass.walletBalanceUSD.get()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		exchangeClass?.bidForSplSharesDetails.numberOfSharesBiddingFor,
		exchangeClass?.bidForSplSharesDetails.bidPricePerShareUsd,
		solanaClass
	])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updateSplBidDetails("purchaseStage", "review")
	}, [exchangeClass])

	const createTitleForButton = useMemo(() => {
		if (isAbleToPurchaseShares === false) return "Unable to purchase shares"
		return "Review Purchase"
	}, [isAbleToPurchaseShares])

	if (_.isNull(exchangeClass)) return null

	return (
		<div className="flex justify-center">
			<Button
				onClick={onClickButton}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title={createTitleForButton}
				disabled={!isAbleToPurchaseShares || _.isEqual(exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor, 0)}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ReviewBidButton)
