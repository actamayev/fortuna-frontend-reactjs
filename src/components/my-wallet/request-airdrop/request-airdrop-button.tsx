import { useCallback, useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import Button from "../../button"
import useRequestAirdrop from "../../../hooks/solana/request-airdrop"

export default function RequestAirdropButton() {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const requestAirdrop = useRequestAirdrop()

	const requestAirdropCallback = useCallback(async () => {
		await requestAirdrop(setIsButtonDisabled)
	}, [requestAirdrop])

	return (
		<Button
			title="Request Airdrop"
			titleIcon={<FaArrowAltCircleDown />}
			colorClass="bg-green-600 dark:bg-green-400"
			hoverClass="hover:bg-green-700 dark:hover:bg-green-600"
			onClick={requestAirdropCallback}
			className="text-white dark:text-zinc-950 font-medium"
			disabled={isButtonDisabled}
		/>
	)
}
