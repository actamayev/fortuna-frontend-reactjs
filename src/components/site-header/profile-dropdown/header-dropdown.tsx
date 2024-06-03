import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useRef } from "react"
import { FiAlignJustify } from "react-icons/fi"
import DropdownItemsContainer from "./dropdown-items-container"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function HeaderDropdown () {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	if (_.isNull(personalInfoClass)) return null

	return (
		<div className="flex items-center">
			<div className="relative inline-block" ref = {dropdownRef}>
				<div
					className="flex items-center cursor-pointer hover:bg-zinc-100 text-zinc-900 \
					dark:text-zinc-100 dark:hover:bg-zinc-800 p-2 rounded"
				>
					{_.isNil(personalInfoClass.profilePictureUrl) ? (
						<FiAlignJustify
							size={20}
							className=""
							onClick={() => setIsOpen(!isOpen)}
						/>
					) :
						<div
							className="w-8 h-8 rounded-full overflow-hidden flex justify-center \
								items-center text-zinc-900 dark:text-zinc-100"
						>
							<img
								src={personalInfoClass.profilePictureUrl}
								alt="Profile"
								className="min-w-full min-h-full object-cover"
								onClick={() => setIsOpen(!isOpen)}
							/>
						</div>
					}
				</div>
				<DropdownItemsContainer isOpen = {isOpen} />
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
