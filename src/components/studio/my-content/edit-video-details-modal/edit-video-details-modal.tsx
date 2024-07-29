import { useRef } from "react"
import { observer } from "mobx-react"
import EditVideoTags from "./edit-video-tags"
import ModalHeader from "../../../modal-header"
import VideoNameTextInput from "./video-name-text-input"
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

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-2/3 max-h-full overflow-visible"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Edit Video Details"
					toggleModalOpen={toggleModalOpen}
				/>
				<div className="p-3">
					<VideoNameTextInput content={content} />
					<VideoDescriptionTextInput content={content}  />
					<ChangeVideoListingStatus content={content} />
					<EditVideoTags content={content} />
				</div>
			</div>
		</div>
	)
}

export default observer(EditVideoDetailsModal)
