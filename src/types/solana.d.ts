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

	interface SolPriceDetails {
		solPriceInUSD: number
		lastRetrieved: Date
	}

	type TransferOption = "username" | "publicKey"
	type TransferStage = "initial" | "review"

	interface TransferSolDetails {
		transferOption: TransferOption

		username: string
		isUsernameSelected: boolean

		publicKey: string
		doesPublicKeyExist: boolean
		isPublicKeyRegisteredWithFortuna: boolean

		solAmount: number
		transferStage: TransferStage
	}

	interface SendingSolTransfer {
		sendingTo: string
		transferAmountSol: number
	}

	interface SolanaTransaction {
		solTransferId: number
		solTransferred: number
		usdTransferred: number

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFeeSol?: number
		transferFeeUsd?: number
	}
}

export {}
