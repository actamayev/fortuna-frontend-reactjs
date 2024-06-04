import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class MarketClass {
	public purchasePrimarySplSharesDetails: PurchasePrimarySplSharesDetails = {
		numberOfTokensPurchasing: 0,
		splPublicKey: "",
		purchaseStage: "initial"
	}

	public instantAccessToExclusiveContentStage: TransactionStage = "initial"

	constructor() {
		makeAutoObservable(this)
	}

	public updatePurchasePrimarySplSharesDetails = action(<K extends keyof PurchasePrimarySplSharesDetails>(
		key: K, value: PurchasePrimarySplSharesDetails[K]
	) => {
		if (typeof this.purchasePrimarySplSharesDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.purchasePrimarySplSharesDetails[key] = value
	})

	public resetPurchaseSplSharesDetails = action(() => {
		this.purchasePrimarySplSharesDetails = {
			numberOfTokensPurchasing: 0,
			splPublicKey: "",
			purchaseStage: "initial"
		}
	})

	public setInstantAccessToExclusiveContentStage = action((newValue: TransactionStage): void => {
		this.instantAccessToExclusiveContentStage = newValue
	})

	public logout() {
		this.resetPurchaseSplSharesDetails()
		this.setInstantAccessToExclusiveContentStage("initial")
	}
}

const MarketContext = createContext<MarketClass | null>(null)

export default function MarketProvider ({ children }: { children: React.ReactNode }) {
	const marketClass = useMemo(() => new MarketClass(), [])

	return (
		<MarketContext.Provider value={marketClass}>
			{children}
		</MarketContext.Provider>
	)
}

export const useMarketContext = () => useContext(MarketContext)
