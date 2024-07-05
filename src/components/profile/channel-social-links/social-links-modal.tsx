import { FaTimes } from "react-icons/fa"
import { useCallback, useRef, useState } from "react"
import ActiveSocialLinks from "./active-social-links"
import AvailableSocialLinks from "./available-social-links"
import HoverOutlineComponent from "../../hover-outline-component"
import { SocialPlatformKey } from "../../../utils/platform-icons"

interface Props {
    toggleEditMode: () => void
}

export default function SocialLinksModal(props: Props) {
	const { toggleEditMode } = props
	const modalRef = useRef<HTMLDivElement>(null)
	const [tempSocialLinks, setTempSocialLinks] = useState<SocialPlatformLinks[]>([])

	const handleAddLink = (platform: SocialPlatformKey) => {
		setTempSocialLinks([...tempSocialLinks, { socialPlatform: platform, socialLink: "" }])
	}

	const handleRemoveLink = (updatedLink: SocialPlatformLinks) => {
		setTempSocialLinks(tempSocialLinks.map(link => link.socialPlatform === updatedLink.socialPlatform ? updatedLink : link))
	}

	// const handleSave = () => {
	// 	// Update the context with new links
	// 	// You can implement this functionality as needed
	// 	toggleEditMode()
	// }

	const handleClickOutside = useCallback((event: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			toggleEditMode()
		}
	}, [toggleEditMode])

	return (
		<div
			className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50"
			onClick={handleClickOutside}
		>
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/4"
				onClick={e => e.stopPropagation()}
			>
				<div className="flex justify-between items-center p-1 border-b border-zinc-200 dark:border-zinc-700">
					<h2 className="text-lg font-medium ml-3">
                        Social Links
					</h2>
					<HoverOutlineComponent
						classes="relative flex items-center justify-center inline-block"
						onClickAction={toggleEditMode}
					>
						<FaTimes />
					</HoverOutlineComponent>
				</div>
				<div className="p-4">
					<ActiveSocialLinks
						tempSocialLinks={tempSocialLinks}
						handleRemoveLink={handleRemoveLink}
					/>
					<AvailableSocialLinks
						tempSocialLinks={tempSocialLinks}
						handleAddLink={handleAddLink}
					/>
				</div>
			</div>
		</div>
	)
}
