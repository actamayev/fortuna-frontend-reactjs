import _ from "lodash"

export default function getTieredAccessPriceUsd(video: SingleVideoDataFromBackend): number | null {
	try {
		const { tierData, numberOfExclusivePurchasesSoFar } = video
		if (_.isNull(numberOfExclusivePurchasesSoFar)) return 0
		let tierNumberPurchases = 0
		for (const tier of tierData) {
			if (_.isNull(tier.purchasesInThisTier)) return tier.tierAccessPrice

			tierNumberPurchases += tier.purchasesInThisTier

			if (numberOfExclusivePurchasesSoFar <= tierNumberPurchases) {
			// If the number of purchases so far is within this tier's range, return its access price
				return tier.tierAccessPrice
			}
		}

		return null
	} catch (error) {
		console.error(error)
		return null
	}
}
