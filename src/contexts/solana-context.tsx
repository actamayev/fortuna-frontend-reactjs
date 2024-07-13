import _ from "lodash"
import { PublicKey } from "@solana/web3.js"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletPublicKey: PublicKey | null = null
	private _walletBalanceSol: number | null = null

	public isMoneyTransferButtonPressed = false
	public moneyTransferDetails: MoneyTransferDetails = {
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

	public setIsMoneyTransferButtonPressed = action((newState: boolean): void => {
		this.isMoneyTransferButtonPressed = newState
	})

	public walletBalanceUSD = computed((): number => {
		if (_.isNull(this.walletBalanceSol) || _.isNull(this.solPriceDetails)) return 0
		return this.walletBalanceSol * this.solPriceDetails.solPriceInUSD
	})

	public setSolPriceDetails = action((newSolPriceDetails: SolPriceDetails): void => {
		this.solPriceDetails = newSolPriceDetails
	})

	public updateMoneyTransferDetails = action(<K extends keyof MoneyTransferDetails>(
		key: K, value: MoneyTransferDetails[K]
	) => {
		if (typeof this.moneyTransferDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.moneyTransferDetails[key] = value
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

	public resetMoneyTransferDetails = action(() => {
		this.moneyTransferDetails = {
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
		this.isMoneyTransferButtonPressed = false
		this.resetMoneyTransferDetails()
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
