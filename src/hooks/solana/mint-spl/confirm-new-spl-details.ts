import _ from "lodash"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useConfirmNewSplDetails(): boolean {
	const solanaClass = useSolanaContext()

	if (
		_.isNull(solanaClass) ||
		_.isEmpty(solanaClass.newSplDetails.splName) ||
		_.isEqual(solanaClass.newSplDetails.numberOfShares, 0) ||
		_.isEqual(solanaClass.newSplDetails.offeringSharePriceUsd, 0) ||
		_.isEqual(solanaClass.newSplDetails.offeringSharePriceSol, 0) ||
		_.isEqual(solanaClass.newSplDetails.creatorOwnershipPercentage, 0) ||
		_.isEmpty(solanaClass.newSplDetails.description)
	) return false
	return true
}
