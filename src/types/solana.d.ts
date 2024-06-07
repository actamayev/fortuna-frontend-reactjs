declare global {
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
