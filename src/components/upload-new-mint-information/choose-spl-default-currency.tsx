import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"

function ChooseSplDefaultCurrency() {
	const solanaClass = useSolanaContext()

	const handleCurrencyChange = useCallback((currency: Currencies) => {
		if (_.isNull(solanaClass)) return
		// TODO: Depending on the currency change, do a currency conversion.
		solanaClass.updateNewSplDetails("listingDefaultCurrency", currency)
	}, [solanaClass])

	if (_.isNull(solanaClass)) return null

	return (
		<div>
			<div className="text-sm font-medium text-gray-600">
				Choose Currency to peg to
			</div>
			<div className="flex flex-col space-y-4 mt-2">
				<div className="flex space-x-4">
					<button
						className={`h-8 w-8 rounded-full text-sm
							${solanaClass.newSplDetails.listingDefaultCurrency === "sol" ? "bg-purple-300" : "bg-gray-300"}`
						}
						onClick={() => handleCurrencyChange("sol")}
					>
						SOL
					</button>
					<button
						className={`h-8 w-8 rounded-full text-sm
							${solanaClass.newSplDetails.listingDefaultCurrency === "usd" ? "bg-green-300" : "bg-gray-300"}`
						}
						onClick={() => handleCurrencyChange("usd")}
					>
						USD
					</button>
				</div>
			</div>
		</div>
	)
}

export default observer(ChooseSplDefaultCurrency)
