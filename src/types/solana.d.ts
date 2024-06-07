declare global {
	interface CommonNewVideoDetails {
		videoName: string
		description: string
		isContentExclusive: boolean
		tierData: TierData[]
	}

	interface TierData {
		tierNumber: number
		isPurchaseTierChecked: boolean
		purchasesInThisTier: number | null // null means there is no limit
		tierDiscount: number
		listingPriceToAccessUsd: number
	}

	interface NewVideoDetails extends CommonNewVideoDetails {
		selectedImage: File | null
		selectedVideo: File | null
	}

	interface CreateVideo extends CommonNewVideoDetails {
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

	type VideoListingStatus = "LISTED" | "SOLDOUT"
}

export {}
