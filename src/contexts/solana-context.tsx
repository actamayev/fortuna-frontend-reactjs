import _ from "lodash"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletAddress: string | null = null
	private _walletBalanceSol: number | null = null

	private _myContent: MyContent[] = []
	public isTransferSolButtonPressed = false
	public transferSolDetails: TransferSolDetails = {
		transferOption: "username",
		username: "",
		isUsernameSelected: false,
		publicKey: "",
		isPublicKeyRegisteredWithFortuna: false,
		doesPublicKeyExist: false,
		solAmount: 0,
		transferStage: "initial"
	}
	private _myTransactions: SolanaTransaction[] = []

	private _myOwnership: MyOwnership[] = []

	public purchaseSplSharesDetails: PurchaseSplSharesDetails = {
		numberOfTokensPurchasing: 0,
		splPublicKey: "",
		purchaseStage: "initial"
	}

	public newSplDetails: NewSPLDetails = {
		splName: "",
		numberOfShares: 100,
		offeringSharePriceUsd: 0.5,
		// TODO: Share price sol should change on the fly to adjust to be approximately $0.5
		// Same for the min/max/step size when purchasing an Spl
		offeringSharePriceSol: 0.003,
		description: "",
		creatorOwnershipPercentage: 50,
		selectedImage: null,
		selectedVideo: null
	}

	public solPriceDetails: SolPriceDetails | null = null

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public hasTransactionsToRetrieve = true
	public isRetrievingTransactions = false

	public isRetrievingWalletDetails = false

	public hasOwnershipToRetrieve = true
	public isRetrievingOwnership = false

	constructor() {
		makeAutoObservable(this)
	}

	get walletAddress(): string | null {
		return this._walletAddress
	}

	set walletAddress(walletAddress: string | null) {
		this._walletAddress = walletAddress
	}

	get walletBalanceSol(): number | null {
		return this._walletBalanceSol
	}

	set walletBalanceSol(walletBalanceSol: number | null) {
		this._walletBalanceSol = walletBalanceSol
	}

	get myTransactions(): SolanaTransaction[] {
		return this._myTransactions
	}

	set myTransactions(myTransactions: SolanaTransaction[]) {
		this._myTransactions = myTransactions
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

	public contextForMyTransaction(transactionId: number): SolanaTransaction | undefined {
		return this.myTransactions.find(transaction => transaction.solTransferId === transactionId)
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

	public setHasTransactionsToRetrieve = action((newState: boolean): void => {
		this.hasTransactionsToRetrieve = newState
	})

	public setIsRetrievingTransactions = action((newState: boolean): void => {
		this.isRetrievingTransactions = newState
	})

	public setTransactions = action((solanaTransactions: SolanaTransaction[]): void => {
		this.myTransactions = []
		solanaTransactions.forEach(transaction => this.addSolanaTransaction(transaction))
	})

	public addSolanaTransaction = action((solanaTransaction: SolanaTransaction): void => {
		const retrievedTransaction = this.contextForMyTransaction(solanaTransaction.solTransferId)
		if (!_.isUndefined(retrievedTransaction)) return
		this.myTransactions.unshift(solanaTransaction)
	})

	public setIsRetrievingWalletDetails = action((newState: boolean): void => {
		this.isRetrievingWalletDetails = newState
	})

	public setHasOwnershipToRetrieve = action((newState: boolean): void => {
		this.hasOwnershipToRetrieve = newState
	})

	public setIsRetrievingOwnership = action((newState: boolean): void => {
		this.isRetrievingOwnership = newState
	})

	public setIsTransferSolButtonPressed = action((newState: boolean): void => {
		this.isTransferSolButtonPressed = newState
	})

	public getWalletBalanceUSD = computed((): number | void => {
		if (_.isNull(this.walletBalanceSol) || _.isNull(this.solPriceDetails)) return
		return this.walletBalanceSol * this.solPriceDetails.solPriceInUSD
	})

	public setSolPriceDetails = action((newSolPriceDetails: SolPriceDetails): void => {
		this.solPriceDetails = newSolPriceDetails
	})

	public updateTransferSolDetails = action(<K extends keyof TransferSolDetails>(key: K, value: TransferSolDetails[K]) => {
		if (typeof this.transferSolDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.transferSolDetails[key] = value
	})

	public resetTransferSolDetails = action(() => {
		this.transferSolDetails = {
			transferOption: "username",
			username: "",
			isUsernameSelected: false,
			publicKey: "",
			isPublicKeyRegisteredWithFortuna: false,
			doesPublicKeyExist: false,
			solAmount: 0,
			transferStage: "initial"
		}
	})

	public updatePurchaseSplSharesDetails = action(<K extends keyof PurchaseSplSharesDetails>(
		key: K, value: PurchaseSplSharesDetails[K]
	) => {
		if (typeof this.purchaseSplSharesDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.purchaseSplSharesDetails[key] = value
	})

	public resetPurchaseSplSharesDetails = action(() => {
		this.purchaseSplSharesDetails = {
			numberOfTokensPurchasing: 0,
			splPublicKey: "",
			purchaseStage: "initial"
		}
	})

	public updateNewSplDetails = action(<K extends keyof NewSPLDetails>(
		key: K, value: NewSPLDetails[K]
	) => {
		if (typeof this.newSplDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.newSplDetails[key] = value
	})

	public resetNewSplDetails = action(() => {
		this.newSplDetails = {
			splName: "",
			numberOfShares: 100,
			offeringSharePriceUsd: 0.5,
			offeringSharePriceSol: 0.003,
			description: "",
			creatorOwnershipPercentage: 50,
			selectedImage: null,
			selectedVideo: null
		}
	})

	public logout() {
		this.walletAddress = null
		this.walletBalanceSol = null
		this.myContent = []
		this.isTransferSolButtonPressed = false
		this.resetTransferSolDetails()
		this.myTransactions = []
		this.myOwnership = []
		this.resetPurchaseSplSharesDetails()
		this.resetNewSplDetails()
		this.solPriceDetails = null
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false
		this.hasTransactionsToRetrieve = true
		this.isRetrievingTransactions = false
		this.isRetrievingWalletDetails = false
		this.hasOwnershipToRetrieve = true
		this.isRetrievingOwnership = false
	}
}

const SolanaContext = createContext<SolanaClass | null>(null)

export default function SolanaProvider ({ children }: { children: React.ReactNode }) {
	const solanaClass = useMemo(() => new SolanaClass(), [])

	return (
		<SolanaContext.Provider value={solanaClass}>
			{children}
		</SolanaContext.Provider>
	)
}

export const useSolanaContext = () => useContext(SolanaContext)
