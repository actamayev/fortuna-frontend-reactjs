import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"
import { numberWithCommasFixed } from "../../../../utils/numbers-with-commas"

// eslint-disable-next-line complexity
function SelectTransferAmount() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	if (
		solanaClass.moneyTransferDetails.transferOption === "username" &&
		solanaClass.moneyTransferDetails.isUsernameSelected === false
	) {
		return null
	}

	if (_.isNull(solanaClass.walletBalanceSol) || _.isEqual(solanaClass.walletBalanceSol, 0)) {
		return <>You have no Sol to transfer</>
	}

	if (solanaClass.moneyTransferDetails.transferOption === "publicKey") {
		if (!_.isEqual(solanaClass.moneyTransferDetails.publicKey.length, 44)) {
			return <>Public Key Must be 44 characters</>
		} else if (solanaClass.moneyTransferDetails.doesPublicKeyExist === false && solanaClass.isPublicKeySearchLoading === false) {
			return <>This Public Key does not exist</>
		} else if (_.isNull(solanaClass.walletPublicKey)) {
			return <>Your Public Key Not found</>
		} else if (solanaClass.moneyTransferDetails.publicKey === solanaClass.walletPublicKey.toString()) {
			return <>Cannot send funds to yourself</>
		}
	}

	if (solanaClass.isPublicKeySearchLoading === true) return null

	if (defaultCurrency === "sol") {
		return (
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title=""
					value={solanaClass.moneyTransferDetails.transferAmount}
					onChange={(e) => {
						solanaClass.updateMoneyTransferDetails("transferAmount", Number(e.target.value))
					}}
					min={0}
					max={solanaClass.walletBalanceSol || 0}
					step={0.0001}
				/>
				{numberWithCommasFixed(solanaClass.moneyTransferDetails.transferAmount, 4)} SOL
			</div>
		)
	}

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title=""
				value={solanaClass.moneyTransferDetails.transferAmount}
				onChange={(e) => {
					solanaClass.updateMoneyTransferDetails("transferAmount", Number(e.target.value))
				}}
				min={0}
				max={solanaClass.walletBalanceUSD.get()}
				step={0.01}
			/>
			${numberWithCommasFixed(solanaClass.moneyTransferDetails.transferAmount, 2)}
		</div>
	)
}

export default observer(SelectTransferAmount)
