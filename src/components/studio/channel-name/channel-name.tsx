import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback, useRef, useEffect } from "react"
import EditPencilButton from "../edit-pencil-button"
import ChannelNameTextInput from "./channel-name-text-input"
import SaveChannelNameButton from "./save-channel-name-button"
import useAddOrEditChannelName from "../../../hooks/creator/add-or-edit-channel-name"
import useAssignDefaultChannelName from "../../../hooks/creator/assign-default-channel-name"

// eslint-disable-next-line max-lines-per-function
function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [inputWidth, setInputWidth] = useState("120px")
	const [isEditing, setIsEditing] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
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
			setInputWidth(`${spanRef.current.offsetWidth + 250}px`)
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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsEditing(false)
				assignDefaultChannelName(setChannelName)
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
	}, [assignDefaultChannelName, isEditing])

	return (
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
				{!isEditing ? (
					<span
						className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold \
						hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-pointer p-1"
						onClick={toggleEditMode}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{channelName}
					</span>
				) : (
					<ChannelNameTextInput
						maxLength={maxLength}
						channelName={channelName}
						setChannelName={setChannelName}
						handleSaveChannelName={handleSaveChannelName}
						updateWidth={updateWidth}
						inputWidth={inputWidth}
						inputRef={inputRef}
					/>
				)}
			</div>
			{(isHovered && !isEditing) && (<EditPencilButton />)}
			{isEditing && (
				<SaveChannelNameButton
					channelName={channelName}
					handleSaveChannelName={handleSaveChannelName}
				/>
			)}
		</div>
	)
}

export default observer(ChannelName)
