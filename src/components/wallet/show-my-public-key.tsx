import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useRetrieveWalletPublicKey from "../../hooks/personal-info/retrieve-wallet-public-key"

function ShowMyPublicKey() {
	const personalInfoClass = usePersonalInfoContext()
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const retrieveWalletPublicKey = useRetrieveWalletPublicKey()

	const handleRetrievePublicKey = useCallback(() => {
		if (isButtonDisabled === true) return
		retrieveWalletPublicKey(setIsButtonDisabled)
	}, [isButtonDisabled, retrieveWalletPublicKey])

	const hidePublicKey = useCallback(() => {
		if (_.isNull(personalInfoClass)) return
		personalInfoClass.publicKey = null
	}, [personalInfoClass])

	const copyToClipboard = useCallback(async () => {
		if (_.isNull(personalInfoClass) || _.isNull(personalInfoClass.publicKey) || isButtonDisabled) return

		try {
			await navigator.clipboard.writeText(personalInfoClass.publicKey)
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [personalInfoClass, isButtonDisabled])

	if (_.isNull(personalInfoClass)) return null

	if (_.isNull(personalInfoClass.publicKey)) {
		return (
			<div className="font-semibold flex items-center">
				<div className="mr-2 cursor-pointer" onClick={handleRetrievePublicKey}>
					<FaEyeSlash style={{ color: personalInfoClass.defaultSiteTheme === "dark" ? "white" : "" }}/>
				</div>
				<div className="flex-grow dark:text-white">My Public Key: **********</div>
			</div>
		)
	}

	return (
		<div className="font-semibold flex items-center">
			<div
				className={`cursor-pointer mr-2 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
				onClick={hidePublicKey}
			>
				<FaEye style={{ color: personalInfoClass.defaultSiteTheme === "dark" ? "white" : "" }}/>
			</div>
			<div className="flex items-center dark:text-white">
				<span className="mr-2">My Public Key:</span>
				<div className="cursor-pointer flex-shrink-0" onClick={copyToClipboard}>
					{personalInfoClass.publicKey}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
