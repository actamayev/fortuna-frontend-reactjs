import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class MarketClass {
	public instantAccessToExclusiveContentStage: TransactionStage = "initial"

	constructor() {
		makeAutoObservable(this)
	}

	public setInstantAccessToExclusiveContentStage = action((newValue: TransactionStage): void => {
		this.instantAccessToExclusiveContentStage = newValue
	})

	public resetInstantAccessToExclusiveContentStage (): void {
		this.setInstantAccessToExclusiveContentStage("initial")
	}

	public logout() {
		this.resetInstantAccessToExclusiveContentStage()
	}
}

const MarketContext = createContext(new MarketClass())

export default function MarketProvider ({ children }: { children: React.ReactNode }) {
	const marketClass = useMemo(() => new MarketClass(), [])

	return (
		<MarketContext.Provider value={marketClass}>
			{children}
		</MarketContext.Provider>
	)
}

export const useMarketContext = () => useContext(MarketContext)
