import ShowAskPrice from "./show-ask-price"
import ConfirmAskButton from "./confirm-ask-button"
import ShowNewWalletBalanceAfterAsk from "./show-new-wallet-balance-after-ask"
import ShowRemainingNumberSharesAfterAsk from "./show-remaining-number-shares-after-ask"

export default function ReviewAskInfo() {
	return (
		<>
			<ShowAskPrice />
			<ShowRemainingNumberSharesAfterAsk />
			<ShowNewWalletBalanceAfterAsk />
			<div className="flex justify-center mt-2">
				<ConfirmAskButton />
			</div>
		</>
	)
}
