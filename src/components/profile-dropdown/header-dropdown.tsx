import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import { useState, useEffect, useRef, useCallback } from "react"
import DropdownItemsContainer from "./dropdown-items-container"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function HeaderDropdown () {
	const location = useLocation()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const personalInfoClass = usePersonalInfoContext()

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [handleClickOutside])

	useEffect(() => {
		setIsOpen(false)
	}, [location])

	return (
		<div className="w-1/4 flex justify-end position: relative z-10">
			<div className="flex items-center">
				<div className="relative inline-block text-left" ref = {dropdownRef}>
					<button
						type="button"
						className="bg-gray-100 text-black border border-yellow-400 rounded px-4 py-2 flex
							items-center text-lg font-semibold hover:shadow-lg"
						id="menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className="max-w-xs truncate">
							{personalInfoClass?.username || "Profile"}
						</span>
					</button>
					<DropdownItemsContainer isOpen = {isOpen} />
				</div>
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
