import _ from "lodash"
import { observer } from "mobx-react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useCallback, useMemo, useState } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { useNotificationsContext } from "../../contexts/notifications-context"

function ShowMyPublicKey() {
	const solanaClass = useSolanaContext()
	const [showPublicKey, setShowPublicKey] = useState(false)
	const notificationsClass = useNotificationsContext()

	const walletPublicKey = useMemo(() => {
		return solanaClass.walletPublicKey
	}, [solanaClass.walletPublicKey])

	const copyToClipboard = useCallback(async () => {
		try {
			if (_.isNull(walletPublicKey)) return
			await navigator.clipboard.writeText(walletPublicKey.toString())
			notificationsClass.setNeutralNotification("Public Key copied to clipboard")
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [notificationsClass, walletPublicKey])

	const setShowPublicKeyCallback = useCallback((): void => {
		setShowPublicKey(prevState => !prevState)
	}, [])


	if (_.isNull(walletPublicKey) || showPublicKey === false) {
		return (
			<div className="font-semibold flex items-center">
				<div
					className="mr-2 cursor-pointer text-black dark:text-white"
					onClick={setShowPublicKeyCallback}
				>
					<FaEyeSlash />
				</div>
				<div className="flex-grow dark:text-zinc-200">My Public Key: **********</div>
			</div>
		)
	}

	return (
		<div className="font-semibold flex items-center">
			<div
				className="cursor-pointer mr-2 text-black dark:text-white"
				onClick={setShowPublicKeyCallback}
			>
				<FaEye />
			</div>
			<div className="flex items-center dark:text-zinc-200">
				<span className="mr-2">My Public Key:</span>
				<div className="cursor-pointer flex-shrink-0" onClick={copyToClipboard}>
					{walletPublicKey.toString()}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
