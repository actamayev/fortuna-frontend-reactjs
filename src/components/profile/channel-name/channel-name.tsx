import _ from "lodash"
import { observer } from "mobx-react"
import { RiPencilFill } from "react-icons/ri"
import { useState, useCallback, useRef, useEffect } from "react"
import ChannelNameTextInput from "./channel-name-text-input"
import SaveChannelNameButton from "./save-channel-name-button"
import HoverOutlineComponent from "../../hover-outline-component"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useAddOrEditChannelName from "../../../hooks/creator/add-or-edit-channel-name"
import useAssignDefaultChannelName from "../../../hooks/creator/assign-default-channel-name"

function ChannelName() {
	const [channelName, setChannelName] = useState("")
	const [inputWidth, setInputWidth] = useState("100px")
	const [isEditing, setIsEditing] = useState(false)
	const maxLength = 60
	const spanRef = useRef<HTMLSpanElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
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

	const toggleEditMode = useCallback(() => {
		setIsEditing(!isEditing)
	}, [isEditing])

	const handleSaveChannelName = useCallback(async () => {
		if (!_.isEmpty(channelName)) await addOrEditChannelName(channelName)
		else assignDefaultChannelName(setChannelName)
		toggleEditMode()
	}, [addOrEditChannelName, assignDefaultChannelName, channelName, setChannelName, toggleEditMode])

	return (
		<div className="mt-3">
			<div className="flex flex-row">
				<label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200">
					Channel Name
				</label>
				{isEditing ? (
					<SaveChannelNameButton
						channelName={channelName}
						handleSaveChannelName={handleSaveChannelName}
					/>
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
