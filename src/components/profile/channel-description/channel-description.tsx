import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import EditPencilButton from "../edit-pencil-button"
import { useCreatorContext } from "../../../contexts/creator-context"
import ChannelDescriptionTextInput from "./channel-description-text-input"
import SaveChannelDescriptionButton from "./save-channel-description-button"
import useAddOrEditChannelDescription from "../../../hooks/creator/add-or-edit-channel-description"

function ChannelDescription() {
	const creatorClass = useCreatorContext()
	const [channelDescription, setChannelDescription] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 1000
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const addOrEditChannelDescription = useAddOrEditChannelDescription()

	useEffect(() => {
		if (creatorClass?.channelDescription) {
			setChannelDescription(creatorClass.channelDescription)
		}
	}, [creatorClass?.channelDescription])

	useEffect(() => {
		if (isEditing && textAreaRef.current) {
			textAreaRef.current.focus()
			textAreaRef.current.setSelectionRange(channelDescription.length, channelDescription.length)
		}
	}, [isEditing, channelDescription])

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto"
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
		}
	}, [channelDescription, creatorClass?.channelDescription, isEditing])

	const toggleEditMode = useCallback(() => {
		setIsEditing(prev => !prev)
	}, [])

	const handleSaveChannelDescription = useCallback(async () => {
		await addOrEditChannelDescription(channelDescription)
		setIsEditing(false)
	}, [addOrEditChannelDescription, channelDescription])

	return (
		<div>
			<div className="flex flex-row items-center">
				<label className="block text-sm font-bold text-zinc-800 dark:text-zinc-50">
					Channel Description
				</label>
				{isEditing ? (
					<SaveChannelDescriptionButton handleSaveChannelDescription = {handleSaveChannelDescription}/>
				) : (
					<EditPencilButton toggleEditMode={toggleEditMode} />
				)}
			</div>
			<div className="flex items-center">
				<div className="relative flex flex-col">
					{isEditing ? (
						<ChannelDescriptionTextInput
							maxLength={maxLength}
							channelDescription={channelDescription}
							setChannelDescription={setChannelDescription}
							textAreaRef={textAreaRef}
							handleSaveChannelDescription={handleSaveChannelDescription}
						/>
					) : (
						<span
							className="text-zinc-950 dark:text-zinc-50 text-sm"
							style={{ width: "75vw", wordWrap: "break-word", whiteSpace: "normal" }}
						>
							<div>{channelDescription}</div>
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(ChannelDescription)
