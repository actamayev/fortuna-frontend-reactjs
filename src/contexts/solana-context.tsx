import _ from "lodash"
import { PublicKey } from "@solana/web3.js"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class SolanaClass {
	private _walletPublicKey: PublicKey | null = null
	private _walletBalanceSol: number | null = null

	public isTransferSolButtonPressed = false
	public transferSolDetails: TransferSolDetails = {
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

	public newSplDetails: NewSPLDetails = {
		splName: "",
		numberOfShares: 100,
		listingSharePriceUsd: 0.5,
		description: "",
		creatorOwnershipPercentage: 50,
		originalContentUrl: "",
		selectedImage: null,
		selectedVideo: null,
		isContentExclusive: false
	}
	public isNewSplLoading = false

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

	public setIsNewSplLoading = action((newState: boolean): void => {
		this.isNewSplLoading = newState
	})

	public setIsPublicKeySearchLoading = action((newState: boolean): void => {
		this.isPublicKeySearchLoading = newState
	})

	public setIsRetrievingWalletDetails = action((newState: boolean): void => {
		this.isRetrievingWalletDetails = newState
	})

	public setIsRetrievingSolPriceDetails = action((newState: boolean): void => {
		this.isRetrievingSolPriceDetails = newState
	})

	public setIsTransferSolButtonPressed = action((newState: boolean): void => {
		this.isTransferSolButtonPressed = newState
	})

	public walletBalanceUSD = computed((): number => {
		if (_.isNull(this.walletBalanceSol) || _.isNull(this.solPriceDetails)) return 0
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

	public alterWalletBalanceSol = action((solToIncrementBy: number): void => {
		if (_.isNull(this.walletBalanceSol)) return
		this.walletBalanceSol += solToIncrementBy
	})

	public alterWalletBalanceUsd = action((usdToIncrementBy: number): void => {
		const solPriceUSD = this.solPriceDetails?.solPriceInUSD
		if (_.isUndefined(solPriceUSD)) return
		this.alterWalletBalanceSol(usdToIncrementBy / solPriceUSD)
	})

	public resetTransferSolDetails = action(() => {
		this.transferSolDetails = {
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

	public updateNewSplDetails = action(<K extends keyof NewSPLDetails>(
		key: K, value: NewSPLDetails[K]
	) => {

		if (typeof this.newSplDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.newSplDetails[key] = value
		if (key === "isContentExclusive" && value === true) {
			if (_.isUndefined(this.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent)) {
				this.newSplDetails.allowValueFromSameCreatorTokensForExclusiveContent = false
			}
			if (_.isUndefined(this.newSplDetails.listingPriceToAccessExclusiveContentUsd)) {
				this.newSplDetails.listingPriceToAccessExclusiveContentUsd = 5
			}
			if (_.isUndefined(this.newSplDetails.valueNeededToAccessExclusiveContentUsd)) {
				this.newSplDetails.valueNeededToAccessExclusiveContentUsd =  1
			}
		}
	})

	public resetNewSplDetails = action(() => {
		this.newSplDetails = {
			splName: "",
			numberOfShares: 100,
			listingSharePriceUsd: 0.5,
			description: "",
			creatorOwnershipPercentage: 50,
			originalContentUrl: "",
			selectedImage: null,
			selectedVideo: null,
			isContentExclusive: false
		}
	})

	public logout() {
		this.walletPublicKey = null
		this.walletBalanceSol = null
		this.isTransferSolButtonPressed = false
		this.resetTransferSolDetails()
		this.isPublicKeySearchLoading = false
		this.resetNewSplDetails()
		this.isNewSplLoading = false
		this.solPriceDetails = null
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
