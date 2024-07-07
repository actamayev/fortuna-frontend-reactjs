import _ from "lodash"
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
	const [isHovered, setIsHovered] = useState(false)
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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsEditing(false)
				if (!_.isNil(creatorClass?.channelDescription)) {
					setChannelDescription(creatorClass.channelDescription)
				}
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
	}, [creatorClass?.channelDescription, isEditing])

	return (
		<div className="flex items-center">
			<div className="relative flex flex-col">
				{!isEditing ? (
					<span
						className="text-zinc-950 dark:text-zinc-50 text-sm font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer px-1 py-3"
						style={{
							width: "75vw",
							wordWrap: "break-word",
							whiteSpace: "normal"
						}}
						onClick={toggleEditMode}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{_.truncate(channelDescription, { length: 150, omission: "..." })}
					</span>
				) : (
					<ChannelDescriptionTextInput
						maxLength={maxLength}
						channelDescription={channelDescription}
						setChannelDescription={setChannelDescription}
						textAreaRef={textAreaRef}
						handleSaveChannelDescription={handleSaveChannelDescription}
					/>
				)}
			</div>
			{(isHovered && !isEditing) && (<EditPencilButton />)}
			{isEditing && (
				<SaveChannelDescriptionButton handleSaveChannelDescription = {handleSaveChannelDescription}/>
			)}
		</div>
	)
}

export default observer(ChannelDescription)
