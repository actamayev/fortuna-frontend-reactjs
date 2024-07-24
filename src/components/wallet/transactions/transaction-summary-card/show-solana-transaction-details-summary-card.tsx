import { observer } from "mobx-react"
import SuccessStatusMessage from "./success-status-message"
import ShowTransactionSignature from "./show-transaction-signature"
import TransactionTypeTemplate from "../../transaction-type-template"
import { useDateTimeFormatter } from "../../../../hooks/date-formatter"
import NewWalletBalanceTemplate from "../../new-wallet-balance-template"
import TransactionDescriptionTemplate from "../../transaction-description-template"
import ShowProvidedUsdOrSolPrice from "../../../usd-or-sol/show-provided-usd-or-sol-price"
import TransactionSummaryCardCategoryHeader from "./transaction-summary-card-category-header"

interface Props {
	solanaTransaction: SolanaTransaction
}

function ShowSolanaTransactionDetailsSummaryCard(props: Props) {
	const { solanaTransaction } = props
	const dateTimeFormatter = useDateTimeFormatter()

	return (
		<div className="flex flex-col space-y-2">
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Date" />
				{dateTimeFormatter(solanaTransaction.transferDateTime)}
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Type" />

				<TransactionTypeTemplate
					depositOrWithdrawal={solanaTransaction.depositOrWithdrawal}
					iconSize={20}
					extraClasses="ml-1 space-x-1.5"
				/>
			</div>
			<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
				<TransactionSummaryCardCategoryHeader categoryName="Description" />
				<TransactionDescriptionTemplate solanaTransaction={solanaTransaction} />
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="New Balance" />
				<NewWalletBalanceTemplate
					newWalletBalanceSol={solanaTransaction.newWalletBalanceSol}
					newWalletBalanceUsd={solanaTransaction.newWalletBalanceUsd}
				/>
			</div>
			<div className="flex flex-row">
				<TransactionSummaryCardCategoryHeader categoryName="Amount" />
				{solanaTransaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
				<ShowProvidedUsdOrSolPrice
					roundOrFixed="fixed"
					solPriceToDisplay={solanaTransaction.solAmountTransferred}
					usdPriceToDisplay={solanaTransaction.usdAmountTransferred}
				/>
			</div>
			<div className="border-b border-zinc-300 dark:border-zinc-700"></div>
			<div>
				<ShowTransactionSignature transactionSignature={solanaTransaction.transactionSignature} />
			</div>
			<div><SuccessStatusMessage /></div>
			<div>
				<TransactionSummaryCardCategoryHeader categoryName="Transaction Fee" />
			</div>
		</div>
	)
}

export default observer(ShowSolanaTransactionDetailsSummaryCard)
