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

	public contextForMyOwnership(splPublicKey: string): MyOwnership | undefined {
		return this.myOwnership.find(ownership => ownership.splPublicKey === splPublicKey)
	}

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
		this.myOwnership[index].numberOfShares += newOwnership.numberOfShares
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

	public logout() {
		this.myContent = []
		this.myOwnership = []
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false
		this.hasOwnershipToRetrieve = true
		this.isRetrievingOwnership = false
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
