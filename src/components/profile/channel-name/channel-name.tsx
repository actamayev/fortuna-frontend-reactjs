import { observer } from "mobx-react"
import { FaPencilAlt } from "react-icons/fa"
import { useState, useCallback, useRef, useEffect } from "react"
import SaveChannelNameButton from "./save-channel-name-button"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useAssignDefaultChannelName from "../../../hooks/creator/assign-default-channel-name"

// eslint-disable-next-line max-lines-per-function
function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [inputWidth, setInputWidth] = useState("100px")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 60
	const spanRef = useRef<HTMLSpanElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
	const assignDefaultChannelName = useAssignDefaultChannelName()

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

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelName(value)
			updateWidth(value)
		}
	}, [updateWidth])

	const toggleEditMode = useCallback(() => {
		setIsEditing(!isEditing)
	}, [isEditing])

	return (
		<div className="mt-3">
			<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
				Channel Name
			</label>
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
						<>
							<input
								type="text"
								className={`mt-1 p-1.5 border rounded text-zinc-950 border-zinc-100 dark:border-zinc-700 
									dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none 
									${channelName.length === maxLength ? "border-red-500 dark:border-red-500" : ""}`}
								value={channelName}
								onChange={handleChange}
								maxLength={maxLength}
								style={{
									minWidth: "100px",
									width: inputWidth,
									paddingRight: "10px",
									boxSizing: "border-box"
								}}
							/>
							<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
								{channelName.length}/{maxLength}
							</span>
						</>
					) : (
						<span className="text-zinc-950 dark:text-zinc-50 text-lg">
							<b>{channelName}</b>
						</span>
					)}
				</div>
				{isEditing ? (
					<SaveChannelNameButton
						channelName={channelName}
						toggleEditMode={toggleEditMode}
						setChannelName={setChannelName}
					/>
				) : (
					<HoverOutlineComponent
						onClickAction={toggleEditMode}
						classes="flex items-center justify-center"
					>
						<FaPencilAlt color={defaultSiteTheme === "dark" ? "white" : "black"} size={15}/>
					</HoverOutlineComponent>
				)}
			</div>
		</div>
	)
}

export default observer(ChannelName)
