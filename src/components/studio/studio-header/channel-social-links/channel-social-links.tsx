import { useCallback, useState } from "react"
import MappedActiveSocialLinks from "./mapped-active-social-links"
import SocialLinksModal from "./social-links-modal/social-links-modal"
import useEscapeListenerUseEffect from "../../../../hooks/listeners/escape-key-listener-use-effect"

export default function ChannelSocialLinks() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	useEscapeListenerUseEffect(isModalOpen, () => setIsModalOpen(false))

	const toggleModalOpen = useCallback(() => {
		setIsModalOpen(prev => !prev)
	}, [])

	return (
		<div className="flex">
			<div
				className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer p-2"
				onClick={toggleModalOpen}
			>
				<MappedActiveSocialLinks />
			</div>
			{isModalOpen && <SocialLinksModal toggleModalOpen={toggleModalOpen} />}
		</div>
	)
}
