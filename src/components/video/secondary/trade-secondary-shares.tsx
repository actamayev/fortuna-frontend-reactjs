import ChooseBuyOrSellSecondaryShares from "./choose-buy-or-sell-secondary-shares"

export default function TradeSecondaryShares() {
	return (
		<div className="flex flex-col h-full">
			<div>
				<div className="flex-1 flex justify-center p-4">
					<div className="text-center font-semibold flex justify-center items-center">
					Trade Secondary Shares
					</div>
				</div>
				<div className="mt-3">
					<ChooseBuyOrSellSecondaryShares />
				</div>
			</div>
			<hr className="border-t border-gray-300 w-full" />
			<div className="flex-1 flex justify-center p-4">
				Order Book
			</div>
		</div>
	)
}
