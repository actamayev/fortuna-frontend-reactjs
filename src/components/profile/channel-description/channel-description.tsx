import { observer } from "mobx-react"
import { FaPencilAlt } from "react-icons/fa"
import { useState, useCallback, useRef, useEffect } from "react"
import HoverOutlineComponent from "../../hover-outline-component"
import { useCreatorContext } from "../../../contexts/creator-context"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import SaveChannelDescriptionButton from "./save-channel-description-button"

function ChannelDescription() {
	const creatorClass = useCreatorContext()
	const [channelDescription, setChannelDescription] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 5000
	const defaultSiteTheme = useDefaultSiteTheme()
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

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
	}, [channelDescription])

	const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelDescription(value)
		}
	}, [])

	const toggleEditMode = useCallback(() => {
		setIsEditing(!isEditing)
	}, [isEditing])

	return (
		<div className="mt-3">
			<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
				Channel Description
			</label>
			<div className="flex items-center">
				<div className="relative flex flex-col">
					{isEditing ? (
						<>
							<textarea
								ref={textAreaRef}
								className={`mt-1 p-1.5 border rounded text-zinc-950 border-zinc-100 dark:border-zinc-700 
									dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none 
									${channelDescription.length === maxLength ? "border-red-500 dark:border-red-500" : ""}`}
								value={channelDescription}
								onChange={handleChange}
								maxLength={maxLength}
								style={{
									minWidth: "100px",
									paddingRight: "10px",
									boxSizing: "border-box",
									resize: "none",
									overflow: "hidden",
								}}
								rows={2}
							/>
							<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
								{channelDescription.length}/{maxLength}
							</span>
						</>
					) : (
						<span className="text-zinc-950 dark:text-zinc-50 text-lg">
							<b>{channelDescription}</b>
						</span>
					)}
				</div>
				{isEditing ? (
					<SaveChannelDescriptionButton
						channelDescription={channelDescription}
						toggleEditMode={toggleEditMode}
					/>
				) : (
					<HoverOutlineComponent
						onClickAction={toggleEditMode}
						classes="flex items-center justify-center"
					>
						<FaPencilAlt color={defaultSiteTheme === "dark" ? "white" : "black"} size={15} />
					</HoverOutlineComponent>
				)}
			</div>
		</div>
	)
}

export default observer(ChannelDescription)
