import _ from "lodash"

interface Props {
	transferSolDetails: TransferSolDetails
	setTransferSolDetails: React.Dispatch<React.SetStateAction<TransferSolDetails>>
}

export default function SelectTransferAmount(props: Props) {
	const { transferSolDetails, setTransferSolDetails } = props

	if (transferSolDetails.transferOption === "username" && transferSolDetails.isUsernameSelected === false) {
		return null
	} else if (transferSolDetails.transferOption === "publicKey") {
		if (!_.isEqual(transferSolDetails.publicKey.length, 44)) {
			return <>Public Key Must be 44 Characters</>
		} else if (transferSolDetails.doesPublicKeyExist === false) {
			return <>This Public Key Does not Exist on Solana</>
		}
	}
	return (
		<input
			type="number"
			value={transferSolDetails.amount}
			onChange={(e) => setTransferSolDetails({ ...transferSolDetails, amount: Number(e.target.value) })}
			className="border rounded-lg p-2"
			placeholder="Amount"
		/>
	)
}
