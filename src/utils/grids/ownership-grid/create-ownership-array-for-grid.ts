export default function createOwnershipArrayForGrid(ownershipArray: MyOwnership[]): OwnershipGridRowData[] {
	const ownershipGridArray = ownershipArray.map(ownership => ({
		splName: ownership.splName,
		numberShares: ownership.numberOfShares,
		videoUUID: ownership.uuid,
		imageUrl: ownership.imageUrl
	}))

	return ownershipGridArray
}
