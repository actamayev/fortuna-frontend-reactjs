declare global {
	interface NewSPLDetails {
		splName: string
		numberOfShares: number
		offeringSharePriceSol: number
		description: string
		creatorOwnershipPercentage: number
	}

	interface MyContent extends SPLDetails {
		imageUrl: string
		splId: string
	}

	interface CreateAndMintSPL extends SPLDetails {
		imageUrl: string
		fileName: string
		uuid: string
		uploadedImageId: number
	}
}

export {}
