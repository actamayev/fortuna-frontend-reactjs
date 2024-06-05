declare global {
	interface CommonNewVideoDetails {
		videoName: string
		listingPriceToAccessUsd: number
		description: string
		isContentExclusive: boolean
		tierData: {
			tierNumber: number
			purchasesInThisTier: number
			tierDiscount: number
		}[]
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
