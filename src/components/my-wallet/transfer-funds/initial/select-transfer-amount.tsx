import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

// eslint-disable-next-line complexity
function SelectTransferAmount() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	if (
		solanaClass.transferFundsDetails.transferOption === "username" &&
		solanaClass.transferFundsDetails.isUsernameSelected === false
	) {
		return null
	}

	if (_.isNull(solanaClass.walletBalanceSol) || _.isEqual(solanaClass.walletBalanceSol, 0)) {
		return <>You have no Sol to transfer</>
	}

	if (solanaClass.transferFundsDetails.transferOption === "publicKey") {
		if (!_.isEqual(solanaClass.transferFundsDetails.publicKey.length, 44)) {
			return <>Public Key Must be 44 characters</>
		} else if (solanaClass.transferFundsDetails.doesPublicKeyExist === false && solanaClass.isPublicKeySearchLoading === false) {
			return <>This Public Key does not exist</>
		}
	}

	if (solanaClass.isPublicKeySearchLoading === true) return null

	if (defaultCurrency === "sol") {
		return (
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title=""
					value={solanaClass.transferFundsDetails.transferAmount}
					onChange={(e) => {
						solanaClass.updateTransferFundsDetails("transferAmount", Number(e.target.value))
					}}
					min={0}
					max={solanaClass.walletBalanceSol || 0}
					step={0.0001}
				/>
				{solanaClass.transferFundsDetails.transferAmount.toFixed(4)} SOL
			</div>
		)
	}

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title=""
				value={solanaClass.transferFundsDetails.transferAmount}
				onChange={(e) => {
					solanaClass.updateTransferFundsDetails("transferAmount", Number(e.target.value))
				}}
				min={0}
				max={solanaClass.walletBalanceUSD.get()}
				step={0.01}
			/>
			${solanaClass.transferFundsDetails.transferAmount.toFixed(2)}
		</div>
	)
}

export default observer(SelectTransferAmount)
