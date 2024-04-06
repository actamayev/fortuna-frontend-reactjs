import _ from "lodash"
import Button from "../../button"

interface Props {
	transferSolDetails: TransferSolDetails
}

export default function SendSolButton(props: Props) {
	const { transferSolDetails } = props

	if (_.isEqual(transferSolDetails.amount, 0)) return null

	return (
		<Button
			onClick={() => console.log("Sending...")}
			colorClass="bg-blue-500"
			hoverClass="hover:bg-blue-600"
			title="Send"
		/>
	)
}
