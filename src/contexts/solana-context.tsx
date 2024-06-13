import _ from "lodash"
import { PublicKey } from "@solana/web3.js"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletPublicKey: PublicKey | null = null
	private _walletBalanceSol: number | null = null

	public isTransferFundsButtonPressed = false
	public transferFundsDetails: TransferFundsDetails = {
		transferOption: "username",
		username: "",
		isUsernameSelected: false,
		publicKey: "",
		isPublicKeyRegisteredWithFortuna: false,
		doesPublicKeyExist: false,
		transferAmount: 0,
		transferStage: "initial"
	}
	public isPublicKeySearchLoading = false

	public solPriceDetails: SolPriceDetails | null = null
	public isRetrievingSolPriceDetails = false

	public isRetrievingWalletDetails = false

	constructor() {
		makeAutoObservable(this)
	}

	get walletPublicKey(): PublicKey | null {
		return this._walletPublicKey
	}

	set walletPublicKey(walletPublicKey: PublicKey | null) {
		this._walletPublicKey = walletPublicKey
	}

	get walletBalanceSol(): number | null {
		return this._walletBalanceSol
	}

	set walletBalanceSol(walletBalanceSol: number | null) {
		this._walletBalanceSol = walletBalanceSol
	}

	public setIsPublicKeySearchLoading = action((newState: boolean): void => {
		this.isPublicKeySearchLoading = newState
	})

	public setIsRetrievingWalletDetails = action((newState: boolean): void => {
		this.isRetrievingWalletDetails = newState
	})

	public setIsRetrievingSolPriceDetails = action((newState: boolean): void => {
		this.isRetrievingSolPriceDetails = newState
	})

	public setIsTransferFundsButtonPressed = action((newState: boolean): void => {
		this.isTransferFundsButtonPressed = newState
	})

	public walletBalanceUSD = computed((): number => {
		if (_.isNull(this.walletBalanceSol) || _.isNull(this.solPriceDetails)) return 0
		return this.walletBalanceSol * this.solPriceDetails.solPriceInUSD
	})

	public setSolPriceDetails = action((newSolPriceDetails: SolPriceDetails): void => {
		this.solPriceDetails = newSolPriceDetails
	})

	public updateTransferFundsDetails = action(<K extends keyof TransferFundsDetails>(
		key: K, value: TransferFundsDetails[K]
	) => {
		if (typeof this.transferFundsDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.transferFundsDetails[key] = value
	})

	public alterWalletBalanceSol = action((solToIncrementBy: number): void => {
		if (_.isNull(this.walletBalanceSol)) return
		this.walletBalanceSol += solToIncrementBy
	})

	public alterWalletBalanceUsd = action((usdToIncrementBy: number): void => {
		const solPriceUSD = this.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPriceUSD)) return
		this.alterWalletBalanceSol(usdToIncrementBy / solPriceUSD)
	})

	public resetTransferFundsDetails = action(() => {
		this.transferFundsDetails = {
			transferOption: "username",
			username: "",
			isUsernameSelected: false,
			publicKey: "",
			isPublicKeyRegisteredWithFortuna: false,
			doesPublicKeyExist: false,
			transferAmount: 0,
			transferStage: "initial"
		}
	})

	public logout() {
		this.walletPublicKey = null
		this.walletBalanceSol = null
		this.isTransferFundsButtonPressed = false
		this.resetTransferFundsDetails()
		this.isPublicKeySearchLoading = false
		// Don't reset sol price details (no reason, not secret/unique to each user)
		this.isRetrievingSolPriceDetails = false
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
