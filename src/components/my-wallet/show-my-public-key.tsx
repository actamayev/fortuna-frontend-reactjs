import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowMyPublicKey() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const [showPublicKey, setShowPublicKey] = useState(false)

	const copyToClipboard = useCallback(async () => {
		if (_.isNull(solanaClass) || _.isNull(solanaClass.walletPublicKey)) return

		try {
			await navigator.clipboard.writeText(solanaClass.walletPublicKey.toString())
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [solanaClass])

	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	if (_.isNull(solanaClass.walletPublicKey) || showPublicKey === false) {
		return (
			<div className="font-semibold flex items-center">
				<div className="mr-2 cursor-pointer" onClick={() => setShowPublicKey(true)}>
					<FaEyeSlash style={{ color: personalInfoClass.defaultSiteTheme === "dark" ? "white" : "" }}/>
				</div>
				<div className="flex-grow dark:text-white">My Public Key: **********</div>
			</div>
		)
	}

	return (
		<div className="font-semibold flex items-center">
			<div
				className="cursor-pointer mr-2"
				onClick={() => setShowPublicKey(false)}
			>
				<FaEye style={{ color: personalInfoClass.defaultSiteTheme === "dark" ? "white" : "" }}/>
			</div>
			<div className="flex items-center dark:text-white">
				<span className="mr-2">My Public Key:</span>
				<div className="cursor-pointer flex-shrink-0" onClick={copyToClipboard}>
					{solanaClass.walletPublicKey.toString()}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
