declare global {
	interface PurchaseSplTokensData {
		numberOfTokensPurchasing: number
		splPublicKey: string
	}

	interface PurchasePrimarySplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
	}

	interface PurchaseSecondarySplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
		pricePerShareUsd: number
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

	interface TransformedAskOrderData {
		secondaryMarketAskId: number
		splId: number
		askPricePerShareUsd: number
	}


	interface TransformedBidOrderData {
		secondaryMarketBidId: number
		splId: number
		bidPricePerShareUsd: number
	}

	interface OpenOrders {
		bids: TransformedBidOrderData[]
		asks: TransformedAskOrderData[]
	}

	type BuyOrSell = "Buy" | "Sell"
}

export {}
