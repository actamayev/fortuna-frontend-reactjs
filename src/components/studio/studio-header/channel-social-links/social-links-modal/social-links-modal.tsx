import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import { useCallback, useEffect, useRef, useState } from "react"
import ActiveSocialLinks from "./active-social-links"
import AvailableSocialLinks from "./available-social-links"
import HoverOutlineComponent from "../../../../hover-outline-component"
import { useCreatorContext } from "../../../../../contexts/creator-context"

interface Props {
    toggleModalOpen: () => void
}

function SocialLinksModal(props: Props) {
	const { toggleModalOpen } = props
	const creatorClass = useCreatorContext()
	const modalRef = useRef<HTMLDivElement>(null)
	const [tempSocialLinks, setTempSocialLinks] = useState<SocialPlatformLinks[]>([])

	useEffect(() => {
		if (creatorClass?.socialPlatformLinks) {
			setTempSocialLinks(creatorClass.socialPlatformLinks)
		}
	}, [creatorClass?.socialPlatformLinks])

	const handleClickOutside = useCallback((event: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			toggleModalOpen()
		}
	}, [toggleModalOpen])

	return (
		<div
			className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50"
			onClick={handleClickOutside}
		>
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/3"
				onClick={e => e.stopPropagation()}
			>
				<div className="flex justify-between items-center px-3 pt-1 border-b border-zinc-200 dark:border-zinc-700">
					<h2 className="text-lg font-bold">
                        Social Links
					</h2>
					<HoverOutlineComponent
						classes="relative flex items-center justify-center inline-block"
						onClickAction={toggleModalOpen}
						circlePixelSize="33px"
					>
						<FaTimes />
					</HoverOutlineComponent>
				</div>
				<div className="p-3">
					<ActiveSocialLinks
						tempSocialLinks={tempSocialLinks}
						setTempSocialLinks={setTempSocialLinks}
					/>
					<AvailableSocialLinks
						tempSocialLinks={tempSocialLinks}
						setTempSocialLinks={setTempSocialLinks}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(SocialLinksModal)
