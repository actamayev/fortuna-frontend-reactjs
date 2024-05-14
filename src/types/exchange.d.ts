declare global {
	interface PurchaseSplTokensData {
		numberOfTokensPurchasing: number
		splPublicKey: string
	}

	interface CreateSPLBidData {
		splPublicKey: string
		numberOfSharesBiddingFor: number
		bidPricePerShareUsd: number
	}

	interface CreateSPLAskData {
		splPublicKey: string
		numberOfSharesAskingFor: number
		askPricePerShareUsd: number
	}

	interface PurchaseData {
		number_of_shares: number
		purchase_price_per_share_usd: number
	}

	interface MyOwnership {
		splName: string
		splPublicKey: string
		purchaseData: PurchaseData[]
		imageUrl: string
		uuid: string
		isMyContent: boolean
	}
}

export {}
