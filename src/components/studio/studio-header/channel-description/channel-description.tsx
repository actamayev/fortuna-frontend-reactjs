import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import { useCreatorContext } from "../../../../contexts/creator-context"
import ChannelDescriptionTextInput from "./channel-description-text-input"
import useAddOrEditChannelDescription from "../../../../hooks/creator/add-or-edit-channel-description"

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
		if (!textAreaRef.current) return
		textAreaRef.current.style.height = "auto"
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
	}, [channelDescription, creatorClass?.channelDescription, isEditing])

	const toggleEditMode = useCallback(() => {
		setIsEditing(prev => !prev)
	}, [])

	const cancelEditAction = useCallback(() => {
		setIsEditing(false)
		if (!_.isNil(creatorClass?.channelDescription)) {
			setChannelDescription(creatorClass.channelDescription)
		}
	}, [creatorClass?.channelDescription])

	const handleSaveChannelDescription = useCallback(async () => {
		await addOrEditChannelDescription(channelDescription)
		setIsEditing(false)
	}, [addOrEditChannelDescription, channelDescription])

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
	}, [creatorClass?.channelDescription, isEditing, cancelEditAction])

	if (isEditing === true) {
		return (
			<div className="flex items-center">
				<ChannelDescriptionTextInput
					maxLength={maxLength}
					channelDescription={channelDescription}
					setChannelDescription={setChannelDescription}
					textAreaRef={textAreaRef}
					handleSaveChannelDescription={handleSaveChannelDescription}
					cancelEditAction={cancelEditAction}
				/>
			</div>

		)
	}

	return (
		<div className="w-full">
			<span
				className="text-zinc-600 dark:text-zinc-300 text-sm \
					hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer p-2 block w-full"
				style={{
					wordBreak: "break-word",
					overflowWrap: "break-word",
				}}
				onClick={toggleEditMode}
			>
				{_.isEmpty(channelDescription.trim()) ? (
					<>Click here to add a description</>
				) : (
					<div>
						{_.truncate(channelDescription, { length: 300 })}
					</div>
				)}
			</span>
		</div>
	)
}

export default observer(ChannelDescription)
