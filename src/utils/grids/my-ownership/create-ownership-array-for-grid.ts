import _ from "lodash"

export default function createOwnershipArrayForGrid(ownershipArray: MyOwnership[]): OwnershipGridRowData[] {
	const ownershipGridArray = ownershipArray.map(ownership => {
		// Calculate the total number of shares and the weighted average price per share
		let totalShares = 0
		let totalValue = 0

		ownership.purchaseData.forEach(purchase => {
			totalShares += purchase.numberOfShares
			totalValue += purchase.numberOfShares * purchase.purchasePricePerShareUsd
		})

		const averagePricePerShareUsd = totalShares > 0 ? totalValue / totalShares : 0

		return {
			splName: ownership.splName,
			numberShares: totalShares,
			averagePricePerShareUsd: _.round(averagePricePerShareUsd, 2),
			videoUUID: ownership.uuid,
			imageUrl: ownership.imageUrl
		}
	})

	return ownershipGridArray
}
