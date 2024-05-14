export default function createOwnershipArrayForGrid(ownershipArray: MyOwnership[]): OwnershipGridRowData[] {
	const ownershipGridArray = ownershipArray.map(ownership => {
		// Calculate the total number of shares and the weighted average price per share
		let totalShares = 0
		let totalValue = 0

		ownership.purchaseData.forEach(purchase => {
			totalShares += purchase.number_of_shares
			totalValue += purchase.number_of_shares * purchase.purchase_price_per_share_usd
		})

		const averagePricePerShareUsd = totalShares > 0 ? totalValue / totalShares : 0

		return {
			splName: ownership.splName,
			numberShares: totalShares,
			averagePricePerShareUsd: averagePricePerShareUsd,
			videoUUID: ownership.uuid,
			imageUrl: ownership.imageUrl
		}
	})

	return ownershipGridArray
}
