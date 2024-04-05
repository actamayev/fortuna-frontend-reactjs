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
		splId: number
		mintAddress: string
	}

	interface CreateAndMintSPL extends NewSPLDetails {
		imageUrl: string
		fileName: string
		uuid: string
		uploadedImageId: number
	}
}

export {}
