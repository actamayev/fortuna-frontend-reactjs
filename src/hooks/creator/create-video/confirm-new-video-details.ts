import _ from "lodash"
import { useCreatorContext } from "../../../contexts/creator-context"

// eslint-disable-next-line complexity
export default function useConfirmNewVideoDetails(): boolean {
	const creatorClass = useCreatorContext()

	if (
		_.isEmpty(creatorClass.newVideoDetails.videoName) ||
		_.isEmpty(creatorClass.newVideoDetails.description)
	) return false

	if (creatorClass.newVideoDetails.isContentExclusive === true) {
		if (_.isEmpty(creatorClass.newVideoDetails.tierData)) return false
		for (const tier of creatorClass.newVideoDetails.tierData) {
			if (
				tier.isPurchaseTierChecked &&
				(_.isNull(tier.purchasesInThisTier) || tier.purchasesInThisTier === 0)
			) return false
		}
		if (
			creatorClass.newVideoDetails.tierData.length === 2 &&
			(
				_.isNull(creatorClass.newVideoDetails.tierData[0].purchasesInThisTier) ||
				creatorClass.newVideoDetails.tierData[0].purchasesInThisTier === 0
			)
		) {
			return false
		}
		if (
			creatorClass.newVideoDetails.tierData.length === 3 &&
			(
				_.isNull(creatorClass.newVideoDetails.tierData[0].purchasesInThisTier) ||
				creatorClass.newVideoDetails.tierData[0].purchasesInThisTier === 0 ||
				_.isNull(creatorClass.newVideoDetails.tierData[1].purchasesInThisTier) ||
				creatorClass.newVideoDetails.tierData[1].purchasesInThisTier === 0
			)
		) {
			return false
		}
	}
	return true
}
