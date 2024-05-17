import ShowBidPrice from "./show-bid-price"
import ConfirmBidButton from "./confirm-bid-button"
import ShowNewShareCountAfterBid from "./show-new-share-count-after-bid"
import ShowRemainingWalletBalanceAfterBid from "./show-remaining-wallet-balance-after-bid"

export default function ReviewBidInfo() {
	return (
		<>
			<ShowBidPrice />
			<ShowNewShareCountAfterBid />
			<ShowRemainingWalletBalanceAfterBid />
			<div className="flex justify-center mt-2">
				<ConfirmBidButton />
			</div>
		</>
	)
}
