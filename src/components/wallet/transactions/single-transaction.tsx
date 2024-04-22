import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useConvertSolAmountDefaultCurrency from "../../../hooks/solana/currency-conversions/convert-sol-amount-to-default-currency"

interface Props {
	transactionId: number
}

// eslint-disable-next-line complexity
function SingleTransaction(props: Props) {
	const { transactionId } = props
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const convertSolAmountToDefaultCurrency = useConvertSolAmountDefaultCurrency()

	const pastTransaction = solanaClass?.contextForMyTransaction(transactionId)
	const formattedDateTime = useMemo(() => {
		const lastRetrieved = pastTransaction?.transferDateTime
		if (_.isUndefined(lastRetrieved)) return "unknown"

		const date = new Date(lastRetrieved)
		const dateString = date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		})
		const timeString = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true
		})

		return `${dateString} at ${timeString}`
	}, [pastTransaction?.transferDateTime])

	if (_.isNull(solanaClass) || _.isUndefined(pastTransaction) || _.isNull(personalInfoClass)) return null

	return (
		<div className="card-container">
			<div>
				{_.upperFirst(pastTransaction.outgoingOrIncoming)} Transfer on {formattedDateTime}
			</div>
			{personalInfoClass.getDefaultCurrency() === "usd" && (<> $</>)}
			{personalInfoClass.getDefaultCurrency() === "sol" && (<> </>)}
			{convertSolAmountToDefaultCurrency(solanaClass.walletBalanceSol || 0)}
			{personalInfoClass.getDefaultCurrency() === "sol" && (<> Sol</>)}
			{pastTransaction.outgoingOrIncoming === "incoming" && (<> from {pastTransaction.transferFromUsername}</>)}
			{pastTransaction.outgoingOrIncoming === "outgoing" &&
				(<> to {pastTransaction.transferToUsername || pastTransaction.transferToPublicKey}</>)
			}
		</div>
	)
}

export default observer(SingleTransaction)
