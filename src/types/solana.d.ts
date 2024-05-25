declare global {
	interface CommonSplDetails {
		splName: string
		numberOfShares: number
		listingSharePriceUsd: number
		description: string
		creatorOwnershipPercentage: number
		originalContentUrl: string
		isContentExclusive: boolean
		valueNeededToAccessExclusiveContentUsd?: number
		listingPriceToAccessExclusiveContentUsd?: number
		allowValueFromSameCreatorTokensForExclusiveContent?: boolean
	}

	interface NewSPLDetails extends CommonSplDetails {
		selectedImage: File | null
		selectedVideo: File | null
	}

	interface CreateAndMintSPL extends CommonSplDetails {
		imageUrl: string
		uuid: string
		uploadedImageId: number
		uploadedVideoId: number
	}

	interface SolPriceDetails {
		solPriceInUSD: number
		lastRetrievedTime: Date
	}

	type TransferOption = "username" | "publicKey"
	type TransactionStage = "initial" | "review"

	interface TransferSolDetails {
		transferOption: TransferOption

		username: string
		isUsernameSelected: boolean

		publicKey: string
		doesPublicKeyExist: boolean
		isPublicKeyRegisteredWithFortuna: boolean

		transferAmount: number
		transferStage: TransactionStage
	}

	interface SendingSolTransfer {
		sendingTo: string
		transferAmount: number
		transferCurrency: Currencies
	}

	type SPLListingStatus =
		"PRELISTING" |
		"LISTED" |
		"SOLDOUT" |
		"REMOVED"
}

export {}
