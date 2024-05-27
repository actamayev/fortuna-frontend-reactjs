declare global {
	interface PurchaseSplTokensData {
		numberOfTokensPurchasing: number
		splPublicKey: string
	}

	interface PurchasePrimarySplSharesDetails extends PurchaseSplTokensData {
		purchaseStage: TransactionStage
	}

	interface PurchaseData {
		numberOfShares: number
		purchasePricePerShareUsd: number
	}

	interface TransactionsMap {
		fillPriceUsd: number
		numberOfShares: number
	}
}

export {}
