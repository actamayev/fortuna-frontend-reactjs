import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PositionsAndTransactionsClass {
	private _myTransactions: SolanaTransaction[] = []
	private _myPurchasedExclusiveContent: MyPurchasedExclusiveContent[] = []

	public hasPurchasedExclusiveContentToRetrieve = true
	public isRetrievingPurchasedExclusiveContent = false

	public hasTransactionsToRetrieve = true
	public isRetrievingTransactions = false

	constructor() {
		makeAutoObservable(this)
	}

	get myTransactions(): SolanaTransaction[] {
		return this._myTransactions
	}

	set myTransactions(myTransactions: SolanaTransaction[]) {
		this._myTransactions = myTransactions
	}

	get myPurchasedExclusiveContent(): MyPurchasedExclusiveContent[] {
		return this._myPurchasedExclusiveContent
	}

	set myPurchasedExclusiveContent(myPurchasedExclusiveContent: MyPurchasedExclusiveContent[]) {
		this._myPurchasedExclusiveContent = myPurchasedExclusiveContent
	}

	public contextForMyTransaction(transactionId: number): SolanaTransaction | undefined {
		return this.myTransactions.find(transaction => transaction.solTransferId === transactionId)
	}

	public contextForMyPurchasesExclusiveContent(uuid: string): MyPurchasedExclusiveContent | undefined {
		return this.myPurchasedExclusiveContent.find(exclusiveContent => exclusiveContent.uuid === uuid)
	}

	public setTransactions = action((solanaTransactions: SolanaTransaction[]): void => {
		this.myTransactions = []
		solanaTransactions.forEach(transaction => this.addSolanaTransaction(transaction))
	})

	public addSolanaTransaction = action((solanaTransaction: SolanaTransaction): void => {
		const retrievedTransaction = this.contextForMyTransaction(solanaTransaction.solTransferId)
		if (!_.isUndefined(retrievedTransaction)) return
		this.myTransactions.unshift(solanaTransaction)
	})

	public setExclusiveContent = action((newExclusiveContent: MyPurchasedExclusiveContent[]): void => {
		this.myPurchasedExclusiveContent = []
		if (_.isEmpty(newExclusiveContent)) return
		newExclusiveContent.map(singleExclusiveContent => this.addExclusiveContent(singleExclusiveContent))
	})

	public addExclusiveContent = action((newExclusiveContent: MyPurchasedExclusiveContent): void => {
		const retrievedExclusiveContent = this.contextForMyPurchasesExclusiveContent(newExclusiveContent.uuid)
		if (!_.isUndefined(retrievedExclusiveContent)) return
		this.myPurchasedExclusiveContent.unshift(newExclusiveContent)
	})

	public checkIfUuidExistsInExclusiveContentList(uuid: string | undefined): boolean {
		if (_.isUndefined(uuid)) return false
		for (const content of this.myPurchasedExclusiveContent) {
			if (_.isEqual(content.uuid, uuid)) return true
		}
		return false
	}

	public setHasOwnershipToRetrieve = action((newState: boolean): void => {
		this.hasPurchasedExclusiveContentToRetrieve = newState
	})

	public setIsRetrievingOwnership = action((newState: boolean): void => {
		this.isRetrievingPurchasedExclusiveContent = newState
	})

	public setHasTransactionsToRetrieve = action((newState: boolean): void => {
		this.hasTransactionsToRetrieve = newState
	})

	public setIsRetrievingTransactions = action((newState: boolean): void => {
		this.isRetrievingTransactions = newState
	})

	public logout() {
		this.myTransactions = []
		this.myPurchasedExclusiveContent = []

		this.hasPurchasedExclusiveContentToRetrieve = true
		this.isRetrievingPurchasedExclusiveContent = false

		this.hasTransactionsToRetrieve = true
		this.isRetrievingTransactions = false
	}
}

const PositionsAndTransactionsContext = createContext<PositionsAndTransactionsClass | null>(null)

export default function PositionsAndTransactionsProvider ({ children }: { children: React.ReactNode }) {
	const positionsAndTransactionsClass = useMemo(() => new PositionsAndTransactionsClass(), [])

	return (
		<PositionsAndTransactionsContext.Provider value={positionsAndTransactionsClass}>
			{children}
		</PositionsAndTransactionsContext.Provider>
	)
}

export const usePositionsAndTransactionsContext = () => useContext(PositionsAndTransactionsContext)
