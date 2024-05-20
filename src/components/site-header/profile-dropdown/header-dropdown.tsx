import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useRef } from "react"
import DropdownItemsContainer from "./dropdown-items-container"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function HeaderDropdown () {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	if (_.isNull(personalInfoClass)) return null

	const hasProfilePicture = !_.isNil(personalInfoClass.profilePictureUrl)
	let buttonClasses
	if (hasProfilePicture === true) {
		buttonClasses = "text-black flex items-center text-md font-semibold hover:shadow-lg"
	} else {
		buttonClasses = "bg-gray-100 hover:bg-gray-200 text-black border border-yellow-400 rounded p-2 flex \
			items-center text-md font-semibold hover:shadow-lg"
	}
	return (
		<div className="z-10 ml-2">
			<div className="flex items-center">
				<div className="relative inline-block text-left" ref = {dropdownRef}>
					<button
						type="button"
						className={buttonClasses}
						id="menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className="flex items-center">
							{_.isNil(personalInfoClass.profilePictureUrl) ? (
								<span className="max-w-xs truncate">{personalInfoClass.username || "Profile"}</span>
							) :
								<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center">
									<img
										src={personalInfoClass.profilePictureUrl}
										alt="Profile"
										className="min-w-full min-h-full object-cover"
									/>
								</div>
							}
						</div>
					</button>
					<DropdownItemsContainer isOpen = {isOpen} />
				</div>
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
