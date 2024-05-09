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
}

export {}
