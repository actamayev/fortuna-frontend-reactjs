export default function getTierByTierNumber(tiers: TierDataFromDB[], tierNumber: number): TierDataFromDB | undefined {
	try {
		return tiers.find(tier => tier.tierNumber === tierNumber)
	} catch (error) {
		console.error(error)
	}
}
