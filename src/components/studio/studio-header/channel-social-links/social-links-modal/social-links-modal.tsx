import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import ModalHeader from "../../../../modal-header"
import ActiveSocialLinks from "./active-social-links"
import AvailableSocialLinks from "./available-social-links"
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
		setTempSocialLinks(creatorClass.socialPlatformLinks)
	}, [creatorClass.socialPlatformLinks])

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/3"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Social Links"
					toggleModalOpen={toggleModalOpen}
				/>
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
