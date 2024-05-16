import ChooseBidOrAsk from "./choose-bid-or-ask"
import TradeSecondarySharesTitle from "./trade-secondary-shares-title"
import BackButtonSecondaryTransaction from "./back-button-secondary-transaction"
import BidForSecondarySharesOptions from "./bid/bid-for-secondary-shares-options"
import AskForSecondarySharesOptions from "./ask/ask-for-secondary-shares-options"

export default function TradeSecondaryShares() {
	return (
		<div className="flex flex-col h-full">
			<div className="h-2/3">
				<div className="flex flex-row justify-between items-center font-semibold w-full">
					<div>
						<BackButtonSecondaryTransaction />
					</div>
					<div className="text-center flex-1">
						<TradeSecondarySharesTitle />
					</div>
				</div>
				<ChooseBidOrAsk />
				<BidForSecondarySharesOptions />
				<AskForSecondarySharesOptions />
			</div>
			<hr className="border-t border-gray-300 w-full" />
			<div className="flex-1 flex justify-center">
				<div className="text-center font-semibold items-center">
					Order Book
				</div>
			</div>
		</div>
	)
}
