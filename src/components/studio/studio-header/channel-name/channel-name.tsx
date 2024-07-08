import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import CancelEditingButton from "../cancel-editing-button"
import ChannelNameTextInput from "./channel-name-text-input"
import SaveChannelNameButton from "./save-channel-name-button"
import useAddOrEditChannelName from "../../../../hooks/creator/add-or-edit-channel-name"
import useAssignDefaultChannelName from "../../../../hooks/creator/assign-default-channel-name"

function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 60
	const inputRef = useRef<HTMLInputElement>(null)
	const assignDefaultChannelName = useAssignDefaultChannelName()
	const addOrEditChannelName = useAddOrEditChannelName()

	useEffect(() => {
		assignDefaultChannelName(setChannelName)
	}, [assignDefaultChannelName])

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
		assignDefaultChannelName(setChannelName)
	}, [assignDefaultChannelName])

	const handleSaveChannelName = useCallback(async () => {
		if (!_.isEmpty(channelName)) await addOrEditChannelName(channelName)
		else assignDefaultChannelName(setChannelName)
		setIsEditing(false)
	}, [addOrEditChannelName, assignDefaultChannelName, channelName, setChannelName])

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
	}, [assignDefaultChannelName, isEditing, cancelEditAction])

	if (isEditing === false) {
		return (
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<span
						className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer py-1 pl-1 pr-3"
						onClick={toggleEditMode}
					>
						{channelName}
					</span>
				</div>
			</div>
		)
	}
	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				<ChannelNameTextInput
					maxLength={maxLength}
					channelName={channelName}
					setChannelName={setChannelName}
					handleSaveChannelName={handleSaveChannelName}
					inputRef={inputRef}
				/>
			</div>
			<>
				<CancelEditingButton
					cancelEditAction={cancelEditAction}
					extraClasses="mb-4"
				/>
				<SaveChannelNameButton
					channelName={channelName}
					handleSaveChannelName={handleSaveChannelName}
				/>
			</>
		</div>
	)
}

export default observer(ChannelName)
