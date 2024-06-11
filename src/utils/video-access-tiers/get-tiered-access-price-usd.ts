import _ from "lodash"

export default function getTieredAccessPriceUsd(video: SingleVideoDataFromBackend): number | null {
	try {
		const { tierData, numberOfExclusivePurchasesSoFar } = video

		let tierNumberPurchases = 0

		const sortedTierData = _.sortBy(tierData, ["tierNumber"])

		for (const tier of sortedTierData) {
			if (_.isNull(tier.purchasesInThisTier)) return tier.tierAccessPriceUsd

			tierNumberPurchases += tier.purchasesInThisTier

			if (_.isNull(numberOfExclusivePurchasesSoFar) || numberOfExclusivePurchasesSoFar < tierNumberPurchases) {
			// If the number of purchases so far is within this tier's range, return its access price
				return tier.tierAccessPriceUsd
			}
		}

		return null
	} catch (error) {
		console.error(error)
		return null
	}
}
