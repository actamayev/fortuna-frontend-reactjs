import { useState } from "react"
import SecondarySharesModal from "./modal/secondary-shares-modal"
import Button from "../../button"

export default function SecondarySharesButton() {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)

	return (
		<div className="mt-4">
			<Button
				onClick={openModal}
				colorClass="bg-blue-500 font-bold text-white"
				hoverClass="hover:bg-blue-700"
				title="Open Trading"
			/>

			{isOpen && (
				<SecondarySharesModal setIsOpen={setIsOpen} />
			)}
		</div>
	)
}
