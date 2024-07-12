import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import ActiveSocialLinks from "./active-social-links"
import AvailableSocialLinks from "./available-social-links"
import HoverOutlineComponent from "../../../../hover-outline-component"
import { useCreatorContext } from "../../../../../contexts/creator-context"
import useClickOutsideModalUseEffect from "../../../../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
    toggleModalOpen: () => void
}

function SocialLinksModal(props: Props) {
	const { toggleModalOpen } = props
	const creatorClass = useCreatorContext()
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	const [tempSocialLinks, setTempSocialLinks] = useState<SocialPlatformLinks[]>([])
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)

	useEffect(() => {
		if (creatorClass?.socialPlatformLinks) {
			setTempSocialLinks(creatorClass.socialPlatformLinks)
		}
	}, [creatorClass?.socialPlatformLinks])

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
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
