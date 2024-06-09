import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function ShowMyPublicKey() {
	const solanaClass = useSolanaContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const [showPublicKey, setShowPublicKey] = useState(false)

	const copyToClipboard = useCallback(async () => {
		if (_.isNull(solanaClass) || _.isNull(solanaClass.walletPublicKey)) return

		try {
			await navigator.clipboard.writeText(solanaClass.walletPublicKey.toString())
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [solanaClass])

	if (_.isNull(solanaClass?.walletPublicKey) || showPublicKey === false) {
		return (
			<div className="font-semibold flex items-center">
				<div className="mr-2 cursor-pointer" onClick={() => setShowPublicKey(true)}>
					<FaEyeSlash style={{ color: defaultSiteTheme === "dark" ? "white" : "" }}/>
				</div>
				<div className="flex-grow dark:text-zinc-200">My Public Key: **********</div>
			</div>
		)
	}

	return (
		<div className="font-semibold flex items-center">
			<div
				className="cursor-pointer mr-2"
				onClick={() => setShowPublicKey(false)}
			>
				<FaEye style={{ color: defaultSiteTheme === "dark" ? "white" : "" }}/>
			</div>
			<div className="flex items-center dark:text-zinc-200">
				<span className="mr-2">My Public Key:</span>
				<div className="cursor-pointer flex-shrink-0" onClick={copyToClipboard}>
					{solanaClass.walletPublicKey.toString()}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
