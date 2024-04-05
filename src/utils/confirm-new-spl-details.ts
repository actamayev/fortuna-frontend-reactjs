import _ from "lodash"

export default function confirmNewSPLDetails (newSPLDetails: NewSPLDetails): boolean {
	if (
		_.isEmpty(newSPLDetails.splName) ||
		_.isEqual(newSPLDetails.numberOfShares, 0) ||
		_.isEqual(newSPLDetails.offeringSharePriceSol, 0) ||
		_.isEqual(newSPLDetails.creatorOwnershipPercentage, 0) ||
		_.isEmpty(newSPLDetails.description)
	) return false

	return true
}
