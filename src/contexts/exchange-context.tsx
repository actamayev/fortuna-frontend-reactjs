import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class ExchangeClass {
	private _myContent: MyContent[] = []
	private _myOwnership: MyOwnership[] = []

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public hasOwnershipToRetrieve = true
	public isRetrievingOwnership = false

	public openOrders: TransformedOrderData[] = []

	public purchasePrimarySplSharesDetails: PurchasePrimarySplSharesDetails = {
		numberOfTokensPurchasing: 0,
		splPublicKey: "",
		purchaseStage: "initial"
	}

	public buyOrSellSecondarySplShares: BuyOrSell  = "Buy"

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

	constructor() {
		makeAutoObservable(this)
	}

	get myContent(): MyContent[] {
		return this._myContent
	}

	set myContent(myContent: MyContent[]) {
		this._myContent = myContent
	}

	get myOwnership(): MyOwnership[] {
		return this._myOwnership
	}

	set myOwnership(myOwnership: MyOwnership[]) {
		this._myOwnership = myOwnership
	}

	public contextForMyContent(mintAddress: string): MyContent | undefined {
		return this.myContent.find(content => content.mintAddress === mintAddress)
	}

	public contextForMyOwnership(uuid: string): MyOwnership | undefined {
		return this.myOwnership.find(ownership => ownership.uuid === uuid)
	}

	public contextForOpenOrders(splId: number): TransformedOrderData | undefined {
		return this.openOrders.find(openOrder => openOrder.splId === splId)
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

	public setContent = action((newContentList: MyContent[]): void => {
		this.myContent = []
		if (_.isEmpty(newContentList)) return
		newContentList.map(singleNewContent => this.addContent(singleNewContent))
	})

	public addContent = action((newContent: MyContent): void => {
		const retrievedContent = this.contextForMyContent(newContent.mintAddress)
		if (!_.isUndefined(retrievedContent)) return
		this.myContent.unshift(newContent)
	})

	public checkIfUuidExistsInContentList(uuid: string): boolean {
		for (const content of this.myContent) {
			if (_.isEqual(content.uuid, uuid)) return true
		}
		return false
	}

	public setMyOwnership = action((newOwnershipList: MyOwnership[]): void => {
		this.myOwnership = []
		if (_.isEmpty(newOwnershipList)) return
		newOwnershipList.map(singleNewOwnership => this.addOwnership(singleNewOwnership))
	})

	public addOwnership = action((newOwnership: MyOwnership): void => {
		const index = this.myOwnership.findIndex(ownership => ownership.splPublicKey === newOwnership.splPublicKey)
		if (_.isEqual(index, -1)) {
			this.myOwnership.unshift(newOwnership)
			return
		}
		this.myOwnership[index].purchaseData = newOwnership.purchaseData
	})

	public getNumberSharesOwnedByUUID(uuid: string): number {
		const ownershipData = this.contextForMyOwnership(uuid)
		if (_.isUndefined(ownershipData)) return 0
		let numberShares = 0
		ownershipData.purchaseData.map(ownership => numberShares += ownership.number_of_shares)
		return numberShares
	}

	public addOpenOrder(openOrder: TransformedOrderData): void {
		this.openOrders.unshift(openOrder)
	}

	public setHasContentToRetrieve = action((newState: boolean): void => {
		this.hasContentToRetrieve = newState
	})

	public setIsRetrievingContent = action((newState: boolean): void => {
		this.isRetrievingContent = newState
	})

	public setHasOwnershipToRetrieve = action((newState: boolean): void => {
		this.hasOwnershipToRetrieve = newState
	})

	public setIsRetrievingOwnership = action((newState: boolean): void => {
		this.isRetrievingOwnership = newState
	})

	public setBuyOrSellSecondaryShares = action((newValue: BuyOrSell): void => {
		this.buyOrSellSecondarySplShares = newValue
	})

	public logout() {
		this.myContent = []
		this.myOwnership = []
		this.openOrders = []
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false
		this.hasOwnershipToRetrieve = true
		this.isRetrievingOwnership = false
		this.resetPurchaseSplSharesDetails()
		this.resetSplBidDetails()
		this.resetSplAskDetails()
		this.buyOrSellSecondarySplShares = "Buy"
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
