import _ from "lodash"
import { createContext, useContext, useMemo } from "react"
import { action, computed, makeAutoObservable } from "mobx"

class PositionsAndTransactionsClass {
	public mySolanaTransactions: SolanaTransaction[] = []
	public transactionsTimeRange: WalletFilterRange = "Month"

	public myPurchasedExclusiveContent: MyPurchasedExclusiveContent[] = []

	public hasPurchasedExclusiveContentToRetrieve = true
	public isRetrievingPurchasedExclusiveContent = false

	public hasTransactionsToRetrieve = true
	public isRetrievingTransactions = false

	public walletFilter: WalletFilter = {
		transactionTitleIncludes: "",
		orderDateBy: "desc",
		transactionType: ["Content Purchases", "Withdrawals", "Deposits"]
	}

	public transactionIdToFocusOn: number | string | null = null // This is either a solanaTransferId, or videoUUID

	public ownershipFilter: OwnershipFilter = {
		sortBy: "Date Purchased",
		orderBy: "desc",
		ownershipTitleIncludes: ""
	}

	constructor() {
		makeAutoObservable(this)
	}

	public contextForMyTransaction(transactionId: number): SolanaTransaction | undefined {
		return this.mySolanaTransactions.find(transaction => transaction.solTransferId === transactionId)
	}

	public contextForMyPurchasesExclusiveContent(uuid: string): MyPurchasedExclusiveContent | undefined {
		return this.myPurchasedExclusiveContent.find(exclusiveContent => exclusiveContent.uuid === uuid)
	}

	public setTransactions = action((solanaTransactions: SolanaTransaction[]): void => {
		this.mySolanaTransactions = []
		solanaTransactions.forEach(transaction => this.addSolanaTransaction(transaction))
	})

	public addSolanaTransaction = action((solanaTransaction: SolanaTransaction): void => {
		const retrievedTransaction = this.contextForMyTransaction(solanaTransaction.solTransferId)
		if (!_.isUndefined(retrievedTransaction)) return
		this.mySolanaTransactions.unshift(solanaTransaction)
	})

	private filterTransactionsByTimeRange = (): SolanaTransaction[] => {
		const now = new Date()
		let timeLimit: Date

		switch (this.transactionsTimeRange) {
		case "Month":
			timeLimit = new Date(now.setMonth(now.getMonth() - 1))
			break
		case "Week":
			timeLimit = new Date(now.setDate(now.getDate() - 7))
			break
		case "Today":
			timeLimit = new Date(now.setDate(now.getDate() - 1))
			break
		default:
			timeLimit = new Date()
		}

		return this.mySolanaTransactions.filter(transaction => new Date(transaction.transferDateTime) >= timeLimit)
	}

	public calculateDepositsUsd = (): number => {
		return computed(() => {
			const transactions = this.filterTransactionsByTimeRange()
			return transactions
				.filter(transaction => transaction.depositOrWithdrawal === "deposit")
				.reduce((total, transaction) => total + transaction.usdAmountTransferred, 0)
		}).get()
	}

	public calculateDepositsSol = (): number => {
		return computed(() => {
			const transactions = this.filterTransactionsByTimeRange()
			return transactions
				.filter(transaction => transaction.depositOrWithdrawal === "deposit")
				.reduce((total, transaction) => total + transaction.solAmountTransferred, 0)
		}).get()
	}

	public calculateWithdrawalsUsd = (): number => {
		return computed(() => {
			const transactions = this.filterTransactionsByTimeRange()
			return transactions
				.filter(transaction => transaction.depositOrWithdrawal === "withdrawal")
				.reduce((total, transaction) => total + transaction.usdAmountTransferred, 0)
		}).get()
	}

	public calculateWithdrawalsSol = (): number => {
		return computed(() => {
			const transactions = this.filterTransactionsByTimeRange()
			return transactions
				.filter(transaction => transaction.depositOrWithdrawal === "withdrawal")
				.reduce((total, transaction) => total + transaction.solAmountTransferred, 0)
		}).get()
	}

	public handleTimeRangeClick = action(() => {
		if (this.transactionsTimeRange === "Month") this.transactionsTimeRange = "Week"
		else if (this.transactionsTimeRange === "Week") this.transactionsTimeRange = "Today"
		else this.transactionsTimeRange = "Month"
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

	public updateWalletFilter = action(<K extends keyof WalletFilter>(
		key: K, newValue: WalletFilter[K]
	) => {
		this.walletFilter[key] = newValue
	})

	public updateMyTransactionsOrderBy = action(() => {
		if (this.walletFilter.orderDateBy === "asc") this.walletFilter.orderDateBy = "desc"
		else this.walletFilter.orderDateBy = "asc"
	})

	public updateTransactionTypeFilter = action((transactionType: TransactionTypes) => {
		const index = this.walletFilter.transactionType.indexOf(transactionType)
		if (index > -1) {
			this.walletFilter.transactionType.splice(index, 1)
			return
		}
		this.walletFilter.transactionType.push(transactionType)
	})

	public updateTransactionToFocusOn = action((newTransactionIdToFocusOn: string | number) => {
		this.transactionIdToFocusOn = newTransactionIdToFocusOn
	})

	public updateOwnershipFilter = action((sortBy: OwnershipSortBy) => {
		if (this.ownershipFilter.sortBy === sortBy) this.updateMyOwnershipOrderBy()
		else {
			this.ownershipFilter.sortBy = sortBy
			this.ownershipFilter.orderBy = "desc"
		}
	})

	private updateMyOwnershipOrderBy = action(() => {
		if (this.ownershipFilter.orderBy === "asc") this.ownershipFilter.orderBy = "desc"
		else this.ownershipFilter.orderBy = "asc"
	})

	public updateOwnershipFilterTitle = action((newTitle: string) => {
		this.ownershipFilter.ownershipTitleIncludes = newTitle
	})

	public logout() {
		this.mySolanaTransactions = []
		this.myPurchasedExclusiveContent = []

		this.hasPurchasedExclusiveContentToRetrieve = true
		this.isRetrievingPurchasedExclusiveContent = false

		this.hasTransactionsToRetrieve = true
		this.isRetrievingTransactions = false

		this.walletFilter = {
			transactionTitleIncludes: "",
			orderDateBy: "desc",
			transactionType: ["Content Purchases", "Withdrawals", "Deposits"]
		}

		this.transactionIdToFocusOn = null

		this.ownershipFilter = {
			sortBy: "Date Purchased",
			orderBy: "desc",
			ownershipTitleIncludes: ""
		}
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
