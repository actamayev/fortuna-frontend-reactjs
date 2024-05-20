declare global {
	interface PurchaseSplTokensData {
		numberOfTokensPurchasing: number
		splPublicKey: string
	}

	interface PurchasePrimarySplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
	}

	interface SecondarySplBidDetails {
		splPublicKey: string
		purchaseStage: TransactionStage
		bidPricePerShareUsd: number
		numberOfSharesBiddingFor: number
	}

	interface SecondarySplAskDetails {
		splPublicKey: string
		saleStage: TransactionStage
		askPricePerShareUsd: number
		numberofSharesAskingFor: number
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

	type TransformedOrderData = TransformedBidOrderData | TransformedAskOrderData

	type BuyOrSell = "Buy" | "Sell"

	interface TransactionsMap {
		fillPriceUsd: number
		numberOfShares: number
	}
}

export {}
