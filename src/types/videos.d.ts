declare global {
	interface VideoData {
		splName: string
		splPublicKey: string
		offeringSharePriceSol: number
		offeringSharePriceUsd: number
		description: string
		imageUrl: string
		videoUrl: string
		uuid: string
		totalNumberShares: number
		sharesRemainingForSale: number
	}
}

export {}
