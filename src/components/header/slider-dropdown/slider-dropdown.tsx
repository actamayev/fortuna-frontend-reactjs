import { useRef, useState } from "react"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"
import SliderDropdownContainer from "./slider-dropdown-container"

export default function SliderDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	return (
		<div className="">
			<div className="flex items-center">
				<div className="relative inline-block text-left" ref = {dropdownRef}>
					<button
						type="button"
						className="bg-gray-100 text-black border border-yellow-400 rounded px-4 flex
							items-center text-md font-semibold hover:shadow-lg duration-75"
						id="menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						onClick={() => setIsOpen(!isOpen)}
						style={{ paddingTop: "2px", paddingBottom: "5px" }}
					>
						<div className="flex items-center">
							:
						</div>

					</button>
					<SliderDropdownContainer isOpen = {isOpen} />
				</div>
			</div>
		</div>
	)
}
