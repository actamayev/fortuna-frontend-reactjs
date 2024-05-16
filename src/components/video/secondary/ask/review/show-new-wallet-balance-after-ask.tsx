import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"

function ShowNewWalletBalanceAfterAsk() {
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(exchangeClass) || _.isNull(personalInfoClass)) return null

	if (personalInfoClass.defaultCurrency === "usd") {
		const walletBalanceUsd = solanaClass.walletBalanceUSD.get()
		const numberSharesAskingFor = exchangeClass.askForSplSharesDetails.numberofSharesAskingFor
		const pricePerAskedShareUsd = exchangeClass.askForSplSharesDetails.askPricePerShareUsd

		return (
			<div className="flex justify-between">
				<div>New Balance: {" "}</div>
				<div>
				${_.round(walletBalanceUsd + numberSharesAskingFor * pricePerAskedShareUsd, 2)} {" "}
					<span className="text-green-600">
						(+${_.round(numberSharesAskingFor * pricePerAskedShareUsd, 2)})
					</span>
				</div>
			</div>
		)
	}

	const walletBalanceSol = solanaClass.walletBalanceSol
	const solPriceInUsd = solanaClass.solPriceDetails?.solPriceInUSD

	if (_.isNull(walletBalanceSol) || _.isUndefined(solPriceInUsd)) return null
	const numberSharesAskingFor = exchangeClass.askForSplSharesDetails.numberofSharesAskingFor
	const pricePerAskedShareSol = exchangeClass.askForSplSharesDetails.askPricePerShareUsd / solPriceInUsd

	return (
		<div className="flex justify-between">
			<div>New Balance: {" "}</div>
			<div>
				{_.round(walletBalanceSol + numberSharesAskingFor * pricePerAskedShareSol, 4)} SOL {" "}
				<span className="text-green-600">
					(+{_.round(numberSharesAskingFor * pricePerAskedShareSol, 4)} SOL)
				</span>
			</div>
		</div>
	)
}

export default observer(ShowNewWalletBalanceAfterAsk)
