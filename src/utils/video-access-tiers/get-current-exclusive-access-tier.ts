import _ from "lodash"

export default function getCurrentExclusiveAccessTier(video: SingleVideoDataFromBackend): number | null {
	try {
		let { tierData } = video
		if (_.isNull(video.numberOfExclusivePurchasesSoFar)) return null

		let cumulativePurchases = 0

		tierData = _.sortBy(tierData, ["tierNumber"])

		for (const tier of tierData) {
			if (_.isNull(tier.purchasesInThisTier)) {
				// If there is no limit for this tier, return its tier number
				return tier.tierNumber
			}

			cumulativePurchases += tier.purchasesInThisTier

			if (video.numberOfExclusivePurchasesSoFar < cumulativePurchases) {
				// If the number of purchases so far is within this tier's range, return its tier number
				return tier.tierNumber
			}
		}

		return null
	} catch (error) {
		console.error(error)
		return null
	}
}
