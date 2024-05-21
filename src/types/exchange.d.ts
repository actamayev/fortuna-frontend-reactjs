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
		numberOfShares: number
		purchasePricePerShareUsd: number
	}

	interface MyOwnership {
		splName: string
		splPublicKey: string
		purchaseData: PurchaseData[]
		imageUrl: string
		uuid: string
		isMyContent: boolean
	}

	interface AskOrderData {
		secondaryMarketAskId: number
		splId: number
		askPricePerShareUsd: number
		numberOfsharesForSale: number
		remainingNumberOfSharesForSale: number
		createdAt: Date
		splName: string
		uuid: string
	}

	interface BidOrderData {
		secondaryMarketBidId: number
		splId: number
		bidPricePerShareUsd: number
		wasBidCancelledDueToFundRequirements: boolean
		numberOfSharesBiddingFor: number
		remainingNumberOfSharesBiddingFor: umber
		createdAt: Date
		splName: string
		uuid: string
	}

	type MyOrder = BidOrderData | AskOrderData

	type BuyOrSell = "Buy" | "Sell"

	interface TransactionsMap {
		fillPriceUsd: number
		numberOfShares: number
	}

	interface AverageFillPrice {
		sharesTransacted: number
		averageFillPrice: number
	}
}

export {}
