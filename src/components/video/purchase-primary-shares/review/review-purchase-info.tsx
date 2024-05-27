import ShowPurchasePrice from "./show-purchase-price"
import PrimaryPurchaseBackButton from "./primary-purchase-back-button"
import ConfirmPrimaryPurchaseButton from "./confirm-primary-purchase-button"
import ShowNewShareCountAfterPurchase from "./show-new-share-count-after-purchase"
import ShowRemainingWalletBalanceAfterPrimaryPurchase from "./show-remaining-wallet-balance-after-primary-purchase"

export default function ReviewPurchaseInfo() {
	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<PrimaryPurchaseBackButton />
				<div className="text-center flex-1">
					Review Purchase
				</div>
			</div>
			<ShowPurchasePrice />
			<ShowNewShareCountAfterPurchase />
			<ShowRemainingWalletBalanceAfterPrimaryPurchase />
			<div className="flex justify-center mt-2">
				<ConfirmPrimaryPurchaseButton />
			</div>
		</>
	)
}
