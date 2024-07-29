import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import SaveButton from "../../save-button"
import CancelEditingButton from "../../cancel-editing-button"
import ChannelNameTextInput from "./channel-name-text-input"
import useEditChannelName from "../../../../hooks/creator/channel-name/edit-channel-name"
import useEscapeListenerUseEffect from "../../../../hooks/listeners/escape-key-listener-use-effect"
import useAssignDefaultChannelName from "../../../../hooks/creator/channel-name/assign-default-channel-name"

function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 60
	const inputRef = useRef<HTMLInputElement>(null)
	const assignDefaultChannelName = useAssignDefaultChannelName()
	const editChannelName = useEditChannelName()
	useEscapeListenerUseEffect(isEditing, () => cancelEditAction())

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
		if (!_.isEmpty(channelName)) await editChannelName(channelName)
		else assignDefaultChannelName(setChannelName)
		setIsEditing(false)
	}, [editChannelName, assignDefaultChannelName, channelName, setChannelName])

	if (isEditing === false) {
		return (
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<span
						className="text-zinc-950 dark:text-zinc-50 text-xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer px-1.5 pt-1.5 pb-1"
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
			<CancelEditingButton
				cancelEditAction={cancelEditAction}
				extraClasses="mb-4 ml-1"
			/>
			{!_.isEmpty(channelName) && (
				<SaveButton handleSaveButton={handleSaveChannelName} extraClasses="mb-4" />
			)}
		</div>
	)
}

export default observer(ChannelName)
