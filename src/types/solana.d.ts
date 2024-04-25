declare global {
	interface CommonSplDetails {
		splName: string
		numberOfShares: number
		offeringSharePriceSol: number
		offeringSharePriceUsd: number
		description: string
		creatorOwnershipPercentage: number
	}

	interface NewSPLDetails extends CommonSplDetails {
		selectedImage: File | null
		selectedVideo: File | null
	}

	interface MyContent extends CommonSplDetails {
		imageUrl: string
		videoUrl: string
		uuid: string
		splId: number
		mintAddress: string
	}

	interface CreateAndMintSPL extends CommonSplDetails {
		imageUrl: string
		videoUrl: string
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

		solAmount: number
		usdAmount: number
		transferStage: TransactionStage
	}

	interface SendingSolTransfer {
		sendingTo: string
		transferAmountSol: number
		transferAmountUsd: number
	}

	interface SolanaTransaction {
		solTransferId: number
		solAmountTransferred: number
		usdAmountTransferred: number
		outgoingOrIncoming: "outgoing" | "incoming"

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFromUsername: string
		transferFeeSol?: number
		transferFeeUsd?: number
		createdAt: Date
	}

	interface PurchaseSplTokensData {
		numberOfTokensPurchasing: number
		splPublicKey: string
	}

	interface PurchaseSplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
	}

	interface MyOwnership {
		splName: string
		splPublicKey: string
		numberOfShares: number
		imageUrl: string
		uuid: string
		isMyContent: boolean
	}
}

export {}
