import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { useState, useCallback, useRef, useEffect } from "react"
import HoverOutlineComponent from "../../hover-outline-component"
import { useCreatorContext } from "../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import SaveChannelDescriptionButton from "./save-channel-description-button"
import useAddOrEditChannelDescription from "../../../hooks/creator/add-or-edit-channel-description"

// eslint-disable-next-line max-lines-per-function
function ChannelDescription() {
	const creatorClass = useCreatorContext()
	const [channelDescription, setChannelDescription] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 1000
	const defaultSiteTheme = useDefaultSiteTheme()
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const addOrEditChannelDescription = useAddOrEditChannelDescription()

	useEffect(() => {
		if (creatorClass?.channelDescription) {
			setChannelDescription(creatorClass.channelDescription)
		}
	}, [creatorClass?.channelDescription])

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto"
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
		}
	}, [channelDescription, creatorClass?.channelDescription, isEditing])

	const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelDescription(value)
		}
	}, [])

	const toggleEditMode = useCallback(() => {
		setIsEditing(!isEditing)
	}, [isEditing])

	const handleSaveChannelDescription = useCallback(async () => {
		await addOrEditChannelDescription(channelDescription)
		toggleEditMode()
	}, [addOrEditChannelDescription, channelDescription, toggleEditMode])

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			handleSaveChannelDescription()
		}
	}, [handleSaveChannelDescription])

	return (
		<div className="mt-3">
			<div className="flex flex-row">
				<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
					Channel Description
				</label>
				{isEditing ? (
					<SaveChannelDescriptionButton handleSaveChannelDescription = {handleSaveChannelDescription}/>
				) : (
					<HoverOutlineComponent
						onClickAction={toggleEditMode}
						classes="flex items-center justify-center"
					>
						<RiPencilFill color={defaultSiteTheme === "dark" ? "white" : "black"} size={17} />
					</HoverOutlineComponent>
				)}
			</div>
			<div className="flex items-center">
				<div className="relative flex flex-col">
					{isEditing ? (
						<>
							<textarea
								ref={textAreaRef}
								className={
									`mt-1 p-1.5 border rounded text-zinc-950 dark:text-zinc-200 text-sm \
									bg-white dark:bg-zinc-800 outline-none
									${channelDescription.length === maxLength ?
							"border-red-500 dark:border-red-500" : "border-zinc-100 dark:border-zinc-700"}`
								}
								value={channelDescription}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								maxLength={maxLength}
								style={{
									width: "75vw",
									boxSizing: "border-box",
									resize: "none",
									overflow: "hidden"
								}}
								rows={2}
							/>
							<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
								{channelDescription.length}/{maxLength}
							</span>
						</>
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
