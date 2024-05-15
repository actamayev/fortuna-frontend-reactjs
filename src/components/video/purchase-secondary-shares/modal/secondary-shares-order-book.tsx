export default function SecondarySharesOrderBook() {
	return (
		<div className="col-span-1 flex flex-col items-end">
			<div className="mb-4">
				<h3 className="text-lg font-semibold">Asks</h3>
				<ul>
					<li>Ask: $15.90</li>
					<li>Ask: $15.85</li>
				</ul>
			</div>
			<div className="mb-4">
				<h3 className="text-lg font-semibold">Last Trade</h3>
				<div>$15.95</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold">Bids</h3>
				<ul>
					<li>Bid: $15.80</li>
					<li>Bid: $15.75</li>
				</ul>
			</div>
		</div>
	)
}
