import { useRef, useState } from "react"
import SliderDropdownContainer from "./slider-dropdown-container"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"

export default function SliderDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	return (
		<div className="z-10">
			<div className="flex items-center">
				<div className="relative inline-block text-left" ref = {dropdownRef}>
					<button
						type="button"
						className="bg-white hover:bg-gray-200 text-black border border-yellow-400 rounded px-4 flex
							items-center text-md font-semibold hover:shadow-lg transition-all duration-50"
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
