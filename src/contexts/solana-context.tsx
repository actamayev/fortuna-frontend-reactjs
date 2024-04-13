import _ from "lodash"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletAddress: string | null = null
	private _walletBalanceSol: number | null = null

	public myContentMap: Map<string, MyContent> = new Map()
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

	public solPriceDetails: SolPriceDetails | null = null

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public hasTransactionsToRetrieve = true
	public isRetrievingTransactions = false

	public isRetrievingWalletDetails = false

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

	public setContent = action((newContentList: MyContent[]): void => {
		this.myContentMap.clear()
		if (_.isEmpty(newContentList)) return
		newContentList.map(singleNewContent => this.addContent(singleNewContent))
	})

	public addContent = action((newContent: MyContent): void => {
		if (this.myContentMap.has(newContent.mintAddress)) return
		this.myContentMap.set(newContent.mintAddress, newContent)
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
		if (typeof this.transferSolDetails[key] === typeof value) {
			this.transferSolDetails[key] = value
		} else {
			console.warn(`Type mismatch when trying to set ${key}`)
		}
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

	public logout() {
		this.walletAddress = null
		this.walletBalanceSol = null
		this.myContentMap.clear()
		this.isTransferSolButtonPressed = false
		this.resetTransferSolDetails()
		this.myTransactionMap.clear()
		this.solPriceDetails = null
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false
		this.hasTransactionsToRetrieve = true
		this.isRetrievingTransactions = false
		this.isRetrievingWalletDetails = false
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
