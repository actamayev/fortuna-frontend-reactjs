import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"

function ShowRemainingWalletBalanceAfterBid() {
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (
		_.isNull(solanaClass) ||
		_.isNull(exchangeClass) ||
		_.isNull(personalInfoClass)
	) return null

	const amountSpendingOnBidUsd =
		exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd * exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor
	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - amountSpendingOnBidUsd

	if (personalInfoClass.defaultCurrency === "usd") {
		return (
			<div className="flex justify-between">
				<div>New Balance:</div>
				<div>
					${remainingWalletBalanceUsd.toFixed(2)} {" "}
					<span className="text-red-600">
						(-${amountSpendingOnBidUsd.toFixed(2)})
					</span>
				</div>
			</div>
		)
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return (
		<div className="flex justify-between">
			<div>New Balance:</div>
			<div>
				{(remainingWalletBalanceUsd / solPriceInUSD).toFixed(4)} SOL {" "}
				<span className="text-red-600">
					(-{(amountSpendingOnBidUsd / solPriceInUSD).toFixed(4)} SOL)
				</span>
			</div>
		</div>
	)
}

export default observer(ShowRemainingWalletBalanceAfterBid)
