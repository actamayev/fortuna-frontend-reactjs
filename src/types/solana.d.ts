declare global {
	interface CommonSplDetails {
		splName: string
		numberOfShares: number
		listingSharePriceUsd: number
		description: string
		creatorOwnershipPercentage: number
		originalContentUrl: string
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

		transferAmount: number
		transferStage: TransactionStage
	}

	interface SendingSolTransfer {
		sendingTo: string
		transferAmount: number
		transferCurrency: Currencies
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

	interface PurchaseSplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
	}

	interface MyOwnership {
		splName: string
		splPublicKey: string
		purchaseData: PurchaseData[]
		imageUrl: string
		uuid: string
		isMyContent: boolean
	}

	interface PurchaseData {
		number_of_shares: number
		purchase_price_per_share_usd: number
	}

	interface MyOwnershipDataInMap {
		purchaseData: PurchaseData[]
		spl: {
			public_key_address: string
			creator_wallet_id: number
			spl_name: string
			uploaded_image: {
				image_url: string
				uuid: string
			}
		}
	}

	type SPLListingStatus =
		"PRELISTING" |
		"LISTED" |
		"SOLDOUT" |
		"REMOVED"
}

export {}
