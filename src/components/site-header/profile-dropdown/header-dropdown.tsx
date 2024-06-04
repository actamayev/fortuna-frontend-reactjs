import _ from "lodash"
import { observer } from "mobx-react"
import { FiAlignJustify } from "react-icons/fi"
import { useState, useRef, useMemo } from "react"
import DropdownItemsContainer from "./dropdown-items-container"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function HeaderDropdown () {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	const profilePictureUrl = useMemo(() => {
		if (_.isNull(personalInfoClass) ||  _.isNil(personalInfoClass.profilePictureUrl)) return ""
		return personalInfoClass.profilePictureUrl
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.profilePictureUrl])

	return (
		<div className="flex items-center">
			<div className="relative inline-block" ref = {dropdownRef}>
				<div
					className="flex items-center cursor-pointer hover:bg-zinc-100 text-zinc-950 \
					dark:text-zinc-100 dark:hover:bg-zinc-800 p-2 rounded"
					onClick={() => setIsOpen(!isOpen)}
				>
					{_.isEmpty(profilePictureUrl) ? (
						<FiAlignJustify size={20} />
					) : (
						<div
							className="w-8 h-8 rounded-full overflow-hidden flex justify-center \
								items-center text-zinc-950 dark:text-zinc-100"
						>
							<img
								src={profilePictureUrl}
								alt="Profile"
								className="min-w-full min-h-full object-cover"
							/>
						</div>
					)}
				</div>
				<DropdownItemsContainer isOpen = {isOpen} />
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
