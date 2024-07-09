import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import SaveButton from "../save-button"
import VideoNameTextInput from "./video-name-text-input"
import CancelEditingButton from "../cancel-editing-button"
import useEditVideoName from "../../../hooks/creator/edit-video-name"
import useAssignDefaultVideoName from "../../../hooks/creator/assign-default-video-name"

interface Props {
	content: MyContent
}

function VideoName(props: Props) {
	const { content } = props
	const [videoName, setVideoName] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 100
	const inputRef = useRef<HTMLInputElement>(null)
	const assignDefaultVideoName = useAssignDefaultVideoName()
	const editVideoName = useEditVideoName()

	useEffect(() => {
		assignDefaultVideoName(content.uuid, setVideoName)
	}, [assignDefaultVideoName, content.uuid])

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
		assignDefaultVideoName(content.uuid, setVideoName)
	}, [assignDefaultVideoName, content.uuid])

	const handleSaveVideoName = useCallback(async () => {
		if (!_.isEmpty(videoName)) await editVideoName(content.uuid, videoName, setVideoName)
		else assignDefaultVideoName(content.uuid, setVideoName)
		setIsEditing(false)
	}, [videoName, editVideoName, content.uuid, assignDefaultVideoName])

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
	}, [assignDefaultVideoName, isEditing, cancelEditAction])

	if (isEditing === false) {
		return (
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<span
						className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 pl-1 pr-3"
						onClick={toggleEditMode}
					>
						{videoName}
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				<VideoNameTextInput
					maxLength={maxLength}
					videoName={videoName}
					setVideoName={setVideoName}
					handleSaveVideoName={handleSaveVideoName}
					inputRef={inputRef}
				/>
			</div>
			<CancelEditingButton
				cancelEditAction={cancelEditAction}
				extraClasses="mb-4 ml-1"
			/>
			{!_.isEmpty(videoName) && (
				<SaveButton handleSaveButton={handleSaveVideoName} extraClasses="mb-4" />
			)}
		</div>
	)
}

export default observer(VideoName)
