declare global {
	interface NewSPLDetails {
		splName: string
		numberOfShares: number
		offeringSharePriceSol: number
		description: string
		creatorOwnershipPercentage: number
	}

	interface MyContent extends NewSPLDetails {
		imageUrl: string
		videoUrl: string
		splId: number
		mintAddress: string
	}

	interface CreateAndMintSPL extends NewSPLDetails {
		imageUrl: string
		videoUrl: string
		uuid: string
		uploadedImageId: number
		uploadedVideoId: number
	}
}

export {}
