import { useRef } from "react"
import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import VideoNameTextInput from "./video-name-text-input"
import HoverOutlineComponent from "../../../hover-outline-component"
import ChangeVideoListingStatus from "./change-video-listing-status"
import VideoDescriptionTextInput from "./video-description-text-input"
import useClickOutsideModalUseEffect from "../../../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

function EditVideoDetailsModal(props: Props) {
	const { content, toggleModalOpen } = props
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)

	// TODO: Make this scrollable (if the description is 5000 chracters it gives problems)
	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-2/3"
				onClick={e => e.stopPropagation()}
			>
				<div className="flex justify-between items-center px-3 pt-1.5 border-b border-zinc-200 dark:border-zinc-700">
					<div className="text-lg font-bold">
                        Edit Video Details
					</div>
					<HoverOutlineComponent
						classes="relative flex items-center justify-center inline-block"
						onClickAction={toggleModalOpen}
						circlePixelSize="33px"
					>
						<FaTimes />
					</HoverOutlineComponent>
				</div>
				<div className="p-3">
					<VideoNameTextInput videoUUID={content.uuid} />
					<VideoDescriptionTextInput videoUUID={content.uuid} />
					<ChangeVideoListingStatus content={content} />
				</div>
			</div>
		</div>
	)
}

export default observer(EditVideoDetailsModal)
