import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class ExchangeClass {
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

const ExchangeContext = createContext<ExchangeClass | null>(null)

export default function ExchangeProvider ({ children }: { children: React.ReactNode }) {
	const exchangeClass = useMemo(() => new ExchangeClass(), [])

	return (
		<ExchangeContext.Provider value={exchangeClass}>
			{children}
		</ExchangeContext.Provider>
	)
}

export const useExchangeContext = () => useContext(ExchangeContext)
