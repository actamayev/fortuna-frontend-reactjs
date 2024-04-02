declare global {
	interface NewSPLDetails {
		splName: string
		numberOfShares: number
		offeringSharePriceSol: number
		description: string
		creatorOwnershipPercentage: number
	}

	interface MyContent extends SPLDetails {
		imageURL: string
		splId: string
	}

	interface CreateAndMintSPL extends SPLDetails {
		imageURL: string
		fileName: string
		uuid: string
		uploadedImageId: number
	}
}

export {}
