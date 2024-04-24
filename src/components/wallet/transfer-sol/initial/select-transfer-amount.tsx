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
			return <>Public Key Must be 44 Characters</>
		} else if (solanaClass.transferSolDetails.doesPublicKeyExist === false) {
			return <>This Public Key Does not Exist on Solana</>
		}
	}

	if (solanaClass.walletBalanceSol === 0) {
		return <>You have no Sol to transfer</>
	}
	if (_.isNull(personalInfoClass)) return null

	if (personalInfoClass.getDefaultCurrency() === "sol") {
		return (
			<div className="flex flex-col space-y-4">
				<RangeSelectorSlider
					title=""
					value={solanaClass.transferSolDetails.solAmount}
					onChange={(e) => {
						solanaClass.updateTransferSolDetails("solAmount", Number(e.target.value))
						if (_.isNull(solanaClass.solPriceDetails)) return
						// eslint-disable-next-line max-len
						solanaClass.updateTransferSolDetails("usdAmount", Number(e.target.value) * solanaClass.solPriceDetails.solPriceInUSD)
					}}
					min={0}
					max={solanaClass.walletBalanceSol || 0}
					step={0.01}
				/>
				{_.round(solanaClass.transferSolDetails.solAmount, 4)} Sol
			</div>
		)
	}

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title=""
				value={solanaClass.transferSolDetails.usdAmount}
				onChange={(e) => {
					solanaClass.updateTransferSolDetails("usdAmount", Number(e.target.value))
					if (_.isNull(solanaClass.solPriceDetails)) return
					solanaClass.updateTransferSolDetails("solAmount", Number(e.target.value) / solanaClass.solPriceDetails.solPriceInUSD )
				}}
				min={0}
				max={convertSolAmountToDefaultCurrency(solanaClass.walletBalanceSol || 0)}
				step={1}
			/>
			${_.round(solanaClass.transferSolDetails.usdAmount, 2)}
		</div>
	)
}

export default observer(SelectTransferAmount)
