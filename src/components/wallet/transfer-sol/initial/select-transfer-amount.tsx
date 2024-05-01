import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"
import useConvertSolAmountDefaultCurrency from "../../../../hooks/solana/currency-conversions/convert-sol-amount-to-default-currency"

// eslint-disable-next-line complexity
function SelectTransferAmount() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const convertSolAmountToDefaultCurrency = useConvertSolAmountDefaultCurrency()

	if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

	if (
		solanaClass.transferSolDetails.transferOption === "username" &&
		solanaClass.transferSolDetails.isUsernameSelected === false
	) {
		return null
	}
	if (solanaClass.transferSolDetails.transferOption === "publicKey") {
		if (!_.isEqual(solanaClass.transferSolDetails.publicKey.length, 44)) {
			return <>Public Key Must be exactly 44 Characters</>
		} else if (solanaClass.transferSolDetails.doesPublicKeyExist === false && solanaClass.isPublicKeySearchLoading === false) {
			return <>This Public Key does not exist</>
		}
	}

	if (_.isNull(solanaClass.walletBalanceSol) || _.isEqual(solanaClass.walletBalanceSol, 0)) {
		return <>You have no Sol to transfer</>
	}
	if (_.isNull(personalInfoClass) || solanaClass.isPublicKeySearchLoading === true) return null

	if (personalInfoClass.defaultCurrency === "sol") {
		return (
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title=""
					value={solanaClass.transferSolDetails.transferAmount}
					onChange={(e) => {
						solanaClass.updateTransferSolDetails("transferAmount", Number(e.target.value))
					}}
					min={0}
					max={solanaClass.walletBalanceSol || 0}
					step={0.01}
				/>
				{_.round(solanaClass.transferSolDetails.transferAmount, 4)} Sol
			</div>
		)
	}

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title=""
				value={solanaClass.transferSolDetails.transferAmount}
				onChange={(e) => {
					solanaClass.updateTransferSolDetails("transferAmount", Number(e.target.value))
				}}
				min={0}
				max={convertSolAmountToDefaultCurrency(solanaClass.walletBalanceSol || 0)}
				step={1}
			/>
			${_.round(solanaClass.transferSolDetails.transferAmount, 2)}
		</div>
	)
}

export default observer(SelectTransferAmount)
