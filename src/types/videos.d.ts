declare global {
	interface VideoData {
		splName: string
		splPublicKey: string
		offeringSharePriceSol: number
		description: string
		imageUrl: string
		videoUrl: string
		uuid: string
		totalNumberShares: number
		sharesRemainingForSale: number
	}
}

export {}
