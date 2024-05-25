import _ from "lodash"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"
import { isSplAsk } from "../utils/type-checks"

class ExchangeClass {
	private _myOrders: MyOrder[] = []

	public hasOrdersToRetrieve = true
	public isRetrievingOrders = false

	public purchasePrimarySplSharesDetails: PurchasePrimarySplSharesDetails = {
		numberOfTokensPurchasing: 0,
		splPublicKey: "",
		purchaseStage: "initial"
	}

	public buyOrSellSecondarySplShares: BuyOrSell = "Buy"

	public bidForSplSharesDetails: SecondarySplBidDetails = {
		numberOfSharesBiddingFor: 0,
		splPublicKey: "",
		purchaseStage: "initial",
		bidPricePerShareUsd: 0
	}

	public askForSplSharesDetails: SecondarySplAskDetails = {
		numberofSharesAskingFor: 0,
		splPublicKey: "",
		saleStage: "initial",
		askPricePerShareUsd: 0
	}

	public instantAccessToExclusiveContentStage: TransactionStage = "initial"

	constructor() {
		makeAutoObservable(this)
	}

	get myOrders(): MyOrder[] {
		return this._myOrders
	}

	set myOrders(myOrders: MyOrder[]) {
		this._myOrders = myOrders
	}

	@computed get splAsks () {
		return this.myOrders.filter(order => isSplAsk(order)) as AskOrderData[]
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

	public updateSplBidDetails = action(<K extends keyof SecondarySplBidDetails>(
		key: K, value: SecondarySplBidDetails[K]
	) => {
		if (typeof this.bidForSplSharesDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.bidForSplSharesDetails[key] = value
	})

	public resetSplBidDetails = action(() => {
		this.bidForSplSharesDetails = {
			numberOfSharesBiddingFor: 0,
			splPublicKey: "",
			purchaseStage: "initial",
			bidPricePerShareUsd: 0
		}
	})

	public updateSplAskDetails = action(<K extends keyof SecondarySplAskDetails>(
		key: K, value: SecondarySplAskDetails[K]
	) => {
		if (typeof this.askForSplSharesDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.askForSplSharesDetails[key] = value
	})

	public resetSplAskDetails = action(() => {
		this.askForSplSharesDetails = {
			numberofSharesAskingFor: 0,
			splPublicKey: "",
			saleStage: "initial",
			askPricePerShareUsd: 0
		}
	})

	public setMyOrders = action((newOrdersList: RetrievedOrdersResponse): void => {
		this.myOrders = []

		if (_.isEmpty(newOrdersList.asks) && _.isEmpty(newOrdersList.bids)) return

		const combinedOrders = [...newOrdersList.asks, ...newOrdersList.bids]
		combinedOrders.sort((a, b) => {
			const dateA = new Date(a.createdAt).getTime()
			const dateB = new Date(b.createdAt).getTime()
			return dateB - dateA
		})

		combinedOrders.forEach(order => this.myOrders.push(order))
	})

	public getRemainingSharesForSale(uuid: string): number {
		return this.splAsks
			.filter(order => order.uuid === uuid)
			.reduce((sum, order) => sum + order.remainingNumberOfSharesForSale, 0)
	}

	public addOrderToBeginning = action((newOrder: MyOrder): void => {
		this.myOrders.unshift(newOrder)
	})

	public setHasOrdersToRetrieve = action((newState: boolean): void => {
		this.hasOrdersToRetrieve = newState
	})

	public setIsRetrievingOrders = action((newState: boolean): void => {
		this.isRetrievingOrders = newState
	})

	public setBuyOrSellSecondaryShares = action((newValue: BuyOrSell): void => {
		this.buyOrSellSecondarySplShares = newValue
	})

	public setInstantAccessToExclusiveContentStage = action((newValue: TransactionStage): void => {
		this.instantAccessToExclusiveContentStage = newValue
	})

	public logout() {
		this.myOrders = []
		this.hasOrdersToRetrieve = true
		this.isRetrievingOrders = false
		this.resetPurchaseSplSharesDetails()
		this.resetSplBidDetails()
		this.resetSplAskDetails()
		this.buyOrSellSecondarySplShares = "Buy"
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
