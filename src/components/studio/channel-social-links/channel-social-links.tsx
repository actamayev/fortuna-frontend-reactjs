import { useCallback, useEffect, useState } from "react"
import MappedActiveSocialLinks from "./mapped-active-social-links"
import SocialLinksModal from "./social-links-modal/social-links-modal"

export default function ChannelSocialLinks() {
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
		<>
			<div
				className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer p-1"
				onClick={toggleModalOpen}
			>
				<MappedActiveSocialLinks />
			</div>
			{isModalOpen && <SocialLinksModal toggleModalOpen={toggleModalOpen} />}
		</>
	)
}
