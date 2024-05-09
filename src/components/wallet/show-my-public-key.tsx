import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useRetrieveWalletPublicKey from "../../hooks/personal-info/retrieve-wallet-public-key"

function ShowMyPublicKey() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const retrieveWalletPublicKey = useRetrieveWalletPublicKey()

	const handleRetrievePublicKey = useCallback(() => {
		if (isButtonDisabled === true) return
		retrieveWalletPublicKey(setIsButtonDisabled)
	}, [isButtonDisabled, retrieveWalletPublicKey])

	const hidePublicKey = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.walletPublicKey = null
	}, [solanaClass])

	const copyToClipboard = useCallback(async () => {
		if (_.isNull(solanaClass) || _.isNull(solanaClass.walletPublicKey) || isButtonDisabled) return

		try {
			await navigator.clipboard.writeText(solanaClass.walletPublicKey)
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [solanaClass, isButtonDisabled])

	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	if (_.isNull(solanaClass.walletPublicKey)) {
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
					{solanaClass.walletPublicKey}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
