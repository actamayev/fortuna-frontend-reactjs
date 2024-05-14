import { useState } from "react"
import Button from "../../button"
import useRequestAirdrop from "../../../hooks/solana/request-airdrop"

export default function RequestAirdropButton() {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const requestAirdrop = useRequestAirdrop()

	return (
		<Button
			title="Request Airdrop"
			colorClass="bg-emerald-200"
			hoverClass="hover:bg-emerald-300"
			onClick={() => requestAirdrop(setIsButtonDisabled)}
			className="font-semibold"
			disabled={isButtonDisabled}
		/>
	)
}
