import BidValue from "./bid-value"
import ReviewBidButton from "./review-bid-button"
import ImpliedVideoValue from "./implied-video-value"
import SelectLimitBidPrice from "./select-limit-bid-price"
import ShowTradingBalance from "../../../show-trading-balance"
import SelectNumberSharesBiddingFor from "./select-number-shares-bidding-for"

export default function InitialBidInfo() {
	return (
		<div>
			<div className="mt-2">
				<ShowTradingBalance />
			</div>
			<div className="mt-2">
				<SelectNumberSharesBiddingFor />
			</div>
			<div className="mt-2">
				<SelectLimitBidPrice />
			</div>
			<div className="mt-2">
				<BidValue />
			</div>
			<div className="mt-2">
				<ImpliedVideoValue />
			</div>
			<div className="mt-2">
				<ReviewBidButton />
			</div>
		</div>
	)
}
