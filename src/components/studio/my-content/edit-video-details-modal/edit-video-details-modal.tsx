import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import { useCallback, useRef } from "react"
import VideoNameTextInput from "./video-name-text-input"
import HoverOutlineComponent from "../../../hover-outline-component"
import VideoDescriptionTextInput from "./video-description-text-input"

interface Props {
	videoUUID: string
	toggleModalOpen: () => void
}

function EditVideoDetailsModal(props: Props) {
	const { videoUUID, toggleModalOpen } = props
	const modalRef = useRef<HTMLDivElement>(null)

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
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-2/3"
				onClick={e => e.stopPropagation()}
			>
				<div className="flex justify-between items-center px-3 pt-1 border-b border-zinc-200 dark:border-zinc-700">
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
					<VideoNameTextInput videoUUID={videoUUID} />
					<VideoDescriptionTextInput videoUUID={videoUUID} />
				</div>
			</div>
		</div>
	)
}

export default observer(EditVideoDetailsModal)
