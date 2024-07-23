import { observer } from "mobx-react"
import TransactionSignature from "./transaction-signature"
import TransactionTypeTemplate from "../../transaction-type-template"
import { useDateTimeFormatter } from "../../../../hooks/date-formatter"
import NewWalletBalanceTemplate from "../../new-wallet-balance-template"
import TransactionDescriptionTemplate from "../../transaction-description-template"
import ShowProvidedUsdOrSolPrice from "../../../usd-or-sol/show-provided-usd-or-sol-price"

interface Props {
	solanaTransaction: SolanaTransaction
}

function ShowSolanaTransactionDetailsSummaryCard(props: Props) {
	const { solanaTransaction } = props
	const dateTimeFormatter = useDateTimeFormatter()

	return (
		<div className="flex flex-col space-y-2">
			<div>
				Transaction Date: {dateTimeFormatter(solanaTransaction.transferDateTime)}
			</div>
			<div>
				<div className="flex flex-row">
					Transaction Type:&nbsp;
					<TransactionTypeTemplate depositOrWithdrawal={solanaTransaction.depositOrWithdrawal} />
				</div>
			</div>
			<div>
				Description:
				<TransactionDescriptionTemplate solanaTransaction={solanaTransaction} />
			</div>
			<div>
				{solanaTransaction.depositOrWithdrawal === "deposit" && (<>New</>)}
				{solanaTransaction.depositOrWithdrawal === "withdrawal" && (<>Remaining</>)}
				&nbsp;Balance:&nbsp;
				<NewWalletBalanceTemplate
					newWalletBalanceSol={solanaTransaction.newWalletBalanceSol}
					newWalletBalanceUsd={solanaTransaction.newWalletBalanceUsd}
				/>
			</div>
			<div>
				Amount:&nbsp;
				{solanaTransaction.depositOrWithdrawal === "deposit" ? (<>+</>) : (<>-</>)}
				<ShowProvidedUsdOrSolPrice
					roundOrFixed="fixed"
					solPriceToDisplay={solanaTransaction.solAmountTransferred}
					usdPriceToDisplay={solanaTransaction.usdAmountTransferred}
				/>
			</div>
			<div>
				<TransactionSignature transactionSignature={solanaTransaction.transactionSignature} />
			</div>
			<div>
				<div className="flex flex-row">
					Status:&nbsp;
					<div className="text-green-600 dark:text-green-400">Complete</div>
				</div>
			</div>
			<div>
				Transaction Fee:
			</div>
		</div>
	)
}

export default observer(ShowSolanaTransactionDetailsSummaryCard)
