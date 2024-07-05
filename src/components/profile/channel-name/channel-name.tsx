import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import EditPencilButton from "../edit-pencil-button"
import ChannelNameTextInput from "./channel-name-text-input"
import SaveChannelNameButton from "./save-channel-name-button"
import useAddOrEditChannelName from "../../../hooks/creator/add-or-edit-channel-name"
import useAssignDefaultChannelName from "../../../hooks/creator/assign-default-channel-name"

function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [inputWidth, setInputWidth] = useState("100px")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 60
	const spanRef = useRef<HTMLSpanElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const assignDefaultChannelName = useAssignDefaultChannelName()
	const addOrEditChannelName = useAddOrEditChannelName()

	useEffect(() => {
		assignDefaultChannelName(setChannelName)
	}, [assignDefaultChannelName])

	const updateWidth = useCallback((text: string) => {
		if (spanRef.current) {
			spanRef.current.textContent = text || " "
			setInputWidth(`${spanRef.current.offsetWidth + 20}px`)
		}
	}, [])

	useEffect(() => {
		updateWidth(channelName)
	}, [channelName, updateWidth])

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditing])

	const toggleEditMode = useCallback(() => {
		setIsEditing(prev => !prev)
	}, [])

	const handleSaveChannelName = useCallback(async () => {
		if (!_.isEmpty(channelName)) await addOrEditChannelName(channelName)
		else assignDefaultChannelName(setChannelName)
		setIsEditing(false)
	}, [addOrEditChannelName, assignDefaultChannelName, channelName, setChannelName])

	return (
		<div>
			<div className="flex flex-row items-center">
				<label className="block text-sm font-medium text-zinc-800 dark:text-zinc-50">
					Channel Name
				</label>
				{isEditing ? (
					<SaveChannelNameButton
						channelName={channelName}
						handleSaveChannelName={handleSaveChannelName}
					/>
				) : (
					<EditPencilButton toggleEditMode={toggleEditMode} />
				)}
			</div>
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<span
						ref={spanRef}
						className="invisible absolute whitespace-pre"
						style={{
							padding: "0 2px",
							whiteSpace: "pre"
						}}
					>
						{channelName}
					</span>
					{isEditing ? (
						<ChannelNameTextInput
							maxLength={maxLength}
							channelName={channelName}
							setChannelName={setChannelName}
							handleSaveChannelName={handleSaveChannelName}
							updateWidth={updateWidth}
							inputWidth={inputWidth}
							inputRef={inputRef}
						/>
					) : (
						<span className="text-zinc-950 dark:text-zinc-50 text-base">
							<div>{channelName}</div>
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(ChannelName)
