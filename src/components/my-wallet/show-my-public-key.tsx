import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import NotificationBox from "../contact/notification-box"

function ShowMyPublicKey() {
	const solanaClass = useSolanaContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const [showPublicKey, setShowPublicKey] = useState(false)
	const [notification, setNotification] = useState<string | null>(null)

	const copyToClipboard = useCallback(async () => {
		if (_.isNull(solanaClass) || _.isNull(solanaClass.walletPublicKey)) return

		try {
			await navigator.clipboard.writeText(solanaClass.walletPublicKey.toString())
			setNotification("Public Key copied to clipboard")
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [solanaClass])

	const setShowPublicKeyCallback = useCallback((whatToSet: boolean): void => {
		setShowPublicKey(whatToSet)
	}, [])

	if (_.isNull(solanaClass?.walletPublicKey) || showPublicKey === false) {
		return (
			<div className="font-semibold flex items-center">
				<div className="mr-2 cursor-pointer" onClick={() => setShowPublicKeyCallback(true)}>
					<FaEyeSlash style={{ color: defaultSiteTheme === "dark" ? "white" : "" }}/>
				</div>
				<div className="flex-grow dark:text-zinc-200">My Public Key: **********</div>
			</div>
		)
	}

	return (
		<div>

			<div className="font-semibold flex items-center">
				<div
					className="cursor-pointer mr-2"
					onClick={() => setShowPublicKeyCallback(false)}
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
			{notification && (
				<NotificationBox
					message={notification}
					onClose={() => setNotification(null)}
				/>
			)}
		</div>
	)
}

export default observer(ShowMyPublicKey)
