declare global {
	interface SolPriceDetails {
		solPriceInUSD: number
		lastRetrievedTime: Date
	}

	type TransferOption = "username" | "publicKey"
	type TransactionStage = "initial" | "review"

	interface TransferFundsDetails {
		transferOption: TransferOption

		username: string
		isUsernameSelected: boolean

		publicKey: string
		doesPublicKeyExist: boolean
		isPublicKeyRegisteredWithFortuna: boolean

		transferAmount: number
		transferStage: TransactionStage
	}

	interface TransferFundsData {
		sendingTo: string
		transferAmount: number
		transferCurrency: Currencies
	}
}

export {}
