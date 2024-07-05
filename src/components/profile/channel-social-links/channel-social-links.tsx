import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import SocialLinksModal from "./social-links-modal"
import EditPencilButton from "../edit-pencil-button"

function ChannelSocialLinks() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModalOpen = useCallback(() => {
		setIsModalOpen(prev => !prev)
	}, [])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsModalOpen(false)
			}
		}

		if (isModalOpen) {
			window.addEventListener("keydown", handleKeyDown)
		} else {
			window.removeEventListener("keydown", handleKeyDown)
		}

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [isModalOpen])

	return (
		<div>
			<div className="flex flex-row items-center">
				<label className="block text-sm font-medium text-zinc-800 dark:text-zinc-50">
					Social Links
				</label>
				<EditPencilButton toggleEditMode={toggleModalOpen} />
			</div>
			{isModalOpen && <SocialLinksModal toggleModalOpen={toggleModalOpen} />}
		</div>
	)
}

export default observer(ChannelSocialLinks)
