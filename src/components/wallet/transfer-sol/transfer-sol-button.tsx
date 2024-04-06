import { useState } from "react"
import Button from "../../button"
import TransferSolCard from "./transfer-sol-card"

export default function TransferSolButton() {
	const [isButtonPressed, setIsButtonPressed] = useState(false)

	// have a button. onclick, a card opens underneath with two options. the first is default selected.
	// teh first option is: username. on type, searches for usernames in fortuna's network.
	// on select a username, select an amount of sol to transfer (can only be up to what the user has)
	// on send, goes to a mini-confirmation screen. to: [username], sending: [amount in sol, dollars], fee: [0].
	// on hover over an (i) next to the fee, should say: 0 fee when transferring within fortuna.
	// the other non-default option is transfer to another public key. if that public key is within fortuna's system, should recognize, and do 0 fee
	// else, should do the same as before, but have a fee.

	return (
		<>
			<Button
				title="Transfer Sol"
				colorClass="bg-blue-400"
				hoverClass="hover:bg-blue-500"
				onClick={() => setIsButtonPressed(!isButtonPressed)}
			/>
			{ isButtonPressed && <TransferSolCard /> }
		</>
	)
}
