import _ from "lodash"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletAddress: string | null = null
	private _walletBalanceSol: number | null = null

	public myContentMap: Map<string, MyContent> = new Map() // Maps Mint Address to MyContent
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
	private _myTransactionMap: Map<number, SolanaTransaction> = new Map()

	public myOwnershipMap: Map<string, MyOwnership> = new Map() // Maps Mint address to my ownership

	public purchaseSplSharesDetails: PurchaseSplSharesDetails = {
		numberOfTokensPurchasing: 0,
		splPublicKey: "",
		purchaseStage: "initial"
	}

	public newSplDetails: NewSPLDetails = {
		splName: "",
		numberOfShares: 0,
		offeringSharePriceSol: 0,
		description: "",
		creatorOwnershipPercentage: 0,
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

	get myTransactionMap(): Map<number, SolanaTransaction> {
		return this._myTransactionMap
	}

	set myTransactionMap(myTransactionMap: Map<number, SolanaTransaction>) {
		this._myTransactionMap = myTransactionMap
	}

	public contextForMyContent(mintAddress: string): MyContent | undefined {
		return this.myContentMap.get(mintAddress)
	}

	public contextForMyTransaction(transactionId: number): SolanaTransaction | undefined {
		return this.myTransactionMap.get(transactionId)
	}

	public contextForMyOwnership(mintAddress: string): MyOwnership | undefined {
		return this.myOwnershipMap.get(mintAddress)
	}

	public setContent = action((newContentList: MyContent[]): void => {
		this.myContentMap.clear()
		if (_.isEmpty(newContentList)) return
		newContentList.map(singleNewContent => this.addContent(singleNewContent))
	})

	public addContent = action((newContent: MyContent): void => {
		if (this.myContentMap.has(newContent.mintAddress)) return
		this.myContentMap.set(newContent.mintAddress, newContent)
	})

	public checkIfUuidExistsInContentList(uuid: string): boolean {
		for (const content of this.myContentMap.values()) {
			if (_.isEqual(content.uuid, uuid)) return true
		}
		return false
	}

	public setMyOwnership = action((newOwnershipList: MyOwnership[]): void => {
		this.myOwnershipMap.clear()
		if (_.isEmpty(newOwnershipList)) return
		newOwnershipList.map(singleNewOwnership => this.addOwnership(singleNewOwnership))
	})

	public addOwnership = action((newOwnership: MyOwnership): void => {
		if (this.myOwnershipMap.has(newOwnership.splPublicKey) === false) {
			this.myOwnershipMap.set(newOwnership.splPublicKey, newOwnership)
			return
		}
		const ownership = this.contextForMyOwnership(newOwnership.splPublicKey)
		if (_.isUndefined(ownership)) return
		ownership.numberOfShares += newOwnership.numberOfShares
		this.myOwnershipMap.set(ownership.splPublicKey, ownership)
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
		this.myTransactionMap.clear()
		if (_.isEmpty(solanaTransactions)) return
		solanaTransactions.map(singleSolanaTransaction => this.addSolanaTransaction(singleSolanaTransaction))
	})

	public addSolanaTransaction = action((solanaTransaction: SolanaTransaction): void => {
		if (this.myTransactionMap.has(solanaTransaction.solTransferId)) return
		this.myTransactionMap.set(solanaTransaction.solTransferId, solanaTransaction)
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
			numberOfShares: 0,
			offeringSharePriceSol: 0,
			description: "",
			creatorOwnershipPercentage: 0,
			selectedImage: null,
			selectedVideo: null
		}
	})

	public logout() {
		this.walletAddress = null
		this.walletBalanceSol = null
		this.myContentMap.clear()
		this.isTransferSolButtonPressed = false
		this.resetTransferSolDetails()
		this.myTransactionMap.clear()
		this.myOwnershipMap.clear()
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
