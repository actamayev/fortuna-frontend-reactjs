import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import SaveButton from "../save-button"
import CancelEditingButton from "../cancel-editing-button"
import VideoDescriptionTextInput from "./video-description-text-input"
import useEditVideoDescription from "../../../hooks/creator/edit-video-description"
import useAssignDefaultVideoDescription from "../../../hooks/creator/assign-default-video-description"

interface Props {
	content: MyContent
}

function VideoDescription(props: Props) {
	const { content } = props
	const [videoDescription, setVideoDescription] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 100
	const inputRef = useRef<HTMLInputElement>(null)
	const assignDefaultVideoDescription = useAssignDefaultVideoDescription()
	const editVideoDescription = useEditVideoDescription()

	useEffect(() => {
		assignDefaultVideoDescription(content.uuid, setVideoDescription)
	}, [assignDefaultVideoDescription, content.uuid])

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditing])

	const toggleEditMode = useCallback(() => {
		setIsEditing(prev => !prev)
	}, [])

	const cancelEditAction = useCallback(() => {
		setIsEditing(false)
		assignDefaultVideoDescription(content.uuid, setVideoDescription)
	}, [assignDefaultVideoDescription, content.uuid])

	const handleSaveVideoDescription = useCallback(async () => {
		if (!_.isEmpty(videoDescription)) await editVideoDescription(content.uuid, videoDescription, setVideoDescription)
		else assignDefaultVideoDescription(content.uuid, setVideoDescription)
		setIsEditing(false)
	}, [videoDescription, editVideoDescription, content.uuid, assignDefaultVideoDescription])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				cancelEditAction()
			}
		}

		if (isEditing) {
			window.addEventListener("keydown", handleKeyDown)
		} else {
			window.removeEventListener("keydown", handleKeyDown)
		}

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [assignDefaultVideoDescription, isEditing, cancelEditAction])

	if (isEditing === false) {
		return (
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<span
						className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 pl-1 pr-3"
						onClick={toggleEditMode}
					>
						{videoDescription}
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				<VideoDescriptionTextInput
					maxLength={maxLength}
					videoDescription={videoDescription}
					setVideoDescription={setVideoDescription}
					handleSaveVideoDescription={handleSaveVideoDescription}
					inputRef={inputRef}
				/>
			</div>
			<CancelEditingButton
				cancelEditAction={cancelEditAction}
				extraClasses="mb-4 ml-1"
			/>
			{!_.isEmpty(videoDescription) && (
				<SaveButton handleSaveButton={handleSaveVideoDescription} extraClasses="mb-4" />
			)}
		</div>
	)
}

export default observer(VideoDescription)
