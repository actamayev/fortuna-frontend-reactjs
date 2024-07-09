import { observer } from "mobx-react"
import { useState, useRef } from "react"
import DropdownItemsContainer from "./dropdown-items-container"
import { useCreatorContext } from "../../../contexts/creator-context"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

function HeaderDropdown () {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const creatorClass = useCreatorContext()
	useClickOutSideUseEffect(dropdownRef, setIsOpen)

	return (
		<div className="flex items-center">
			<div className="relative inline-block" ref={dropdownRef}>
				<div
					className="flex items-center cursor-pointer hover:bg-zinc-100 text-zinc-950 \
						dark:text-zinc-100 dark:hover:bg-zinc-800 p-2 rounded"
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center text-zinc-950 dark:text-zinc-100">
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={creatorClass?.profilePictureUrl}
							extraClasses="min-w-full min-h-full object-cover"
						/>
					</div>
				</div>
				<DropdownItemsContainer isOpen = {isOpen} />
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
