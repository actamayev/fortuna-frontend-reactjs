import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../button"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useRetrieveWalletPublicKey from "../../hooks/personal-info/retrieve-wallet-public-key"

function ShowMyPublicKey() {
	const personalInfoClass = usePersonalInfoContext()
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const retrieveWalletPublicKey = useRetrieveWalletPublicKey()

	if (_.isNull(personalInfoClass)) return null

	// TODO: should be a way to hide public key (should remove from class as well)
	if (!_.isNull(personalInfoClass.publicKey)) {
		return <div className="font-semibold">{personalInfoClass.publicKey}</div>
	}
	return (
		<Button
			title="Show my Public Key"
			colorClass="bg-purple-200"
			hoverClass="hover:bg-purple-300"
			onClick={() => retrieveWalletPublicKey(setIsButtonDisabled)}
			className="font-semibold"
			disabled={isButtonDisabled}
		/>
	)
}

export default observer(ShowMyPublicKey)
