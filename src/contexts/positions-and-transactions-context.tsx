import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PositionsAndTransactionsClass {
	private _myContent: MyContent[] = []
	private _myOwnership: MyOwnership[] = []
	private _myTransactions: SolanaTransaction[] = []

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public hasOwnershipToRetrieve = true
	public isRetrievingOwnership = false

	public hasTransactionsToRetrieve = true
	public isRetrievingTransactions = false

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


	get myTransactions(): SolanaTransaction[] {
		return this._myTransactions
	}

	set myTransactions(myTransactions: SolanaTransaction[]) {
		this._myTransactions = myTransactions
	}

	public contextForMyContent(mintAddress: string): MyContent | undefined {
		return this.myContent.find(content => content.mintAddress === mintAddress)
	}

	public contextForMyOwnership(uuid: string): MyOwnership | undefined {
		return this.myOwnership.find(ownership => ownership.uuid === uuid)
	}

	public contextForMyTransaction(transactionId: number): SolanaTransaction | undefined {
		return this.myTransactions.find(transaction => transaction.solTransferId === transactionId)
	}

	public setTransactions = action((solanaTransactions: SolanaTransaction[]): void => {
		this.myTransactions = []
		solanaTransactions.forEach(transaction => this.addSolanaTransaction(transaction))
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
		this.incremenetOwnership(newOwnership.splPublicKey, newOwnership.purchaseData)
	})

	public incremenetOwnership = action((splPublicKey: string, purchaseData: PurchaseData[]): void => {
		const index = this.myOwnership.findIndex(ownership => ownership.splPublicKey === splPublicKey)
		if (_.isEqual(index, -1)) return
		this.myOwnership[index].purchaseData.push(...purchaseData)
	})

	public getNumberSharesOwnedByUUID(uuid: string): number {
		const ownershipData = this.contextForMyOwnership(uuid)
		if (_.isUndefined(ownershipData)) return 0
		let numberShares = 0
		ownershipData.purchaseData.map(ownership => numberShares += ownership.numberOfShares)
		return numberShares
	}

	public getNumberSharesAbleToSell(uuid: string, remainingSharesForSale: number): number {
		const numberSharesOwned = this.getNumberSharesOwnedByUUID(uuid)
		const sumOfSharesAsked = remainingSharesForSale

		return numberSharesOwned - sumOfSharesAsked
	}

	public addSolanaTransaction = action((solanaTransaction: SolanaTransaction): void => {
		const retrievedTransaction = this.contextForMyTransaction(solanaTransaction.solTransferId)
		if (!_.isUndefined(retrievedTransaction)) return
		this.myTransactions.unshift(solanaTransaction)
	})

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

	public setHasTransactionsToRetrieve = action((newState: boolean): void => {
		this.hasTransactionsToRetrieve = newState
	})

	public setIsRetrievingTransactions = action((newState: boolean): void => {
		this.isRetrievingTransactions = newState
	})

	public logout() {
		this.myContent = []
		this.myOwnership = []
		this.myTransactions = []

		this.hasContentToRetrieve = true
		this.isRetrievingContent = false

		this.hasOwnershipToRetrieve = true
		this.isRetrievingOwnership = false

		this.hasTransactionsToRetrieve = true
		this.isRetrievingTransactions = false
	}
}

const PositionsAndTransactionsContext = createContext<PositionsAndTransactionsClass | null>(null)

export default function PositionsAndTransactionsProvider ({ children }: { children: React.ReactNode }) {
	const solanaClass = useMemo(() => new PositionsAndTransactionsClass(), [])

	return (
		<PositionsAndTransactionsContext.Provider value={solanaClass}>
			{children}
		</PositionsAndTransactionsContext.Provider>
	)
}

export const usePositionsAndTransactionsContext = () => useContext(PositionsAndTransactionsContext)
