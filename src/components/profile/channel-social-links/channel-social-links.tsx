import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import SocialLinksModal from "./social-links-modal"
import EditPencilButton from "../edit-pencil-button"

function ChannelSocialLinks() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModalOpen = useCallback(() => {
		setIsModalOpen(prev => !prev)
	}, [])

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
