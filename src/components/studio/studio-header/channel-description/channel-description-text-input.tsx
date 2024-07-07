import { useCallback } from "react"
import CancelEditingButton from "../cancel-editing-button"
import SaveChannelDescriptionButton from "./save-channel-description-button"

interface Props {
	maxLength: number
	channelDescription: string
	setChannelDescription: React.Dispatch<React.SetStateAction<string>>
	textAreaRef: React.RefObject<HTMLTextAreaElement>
	handleSaveChannelDescription: () => Promise<void>
	toggleEditAndAssignDefaultDescriptionName: () => void
}

export default function ChannelDescriptionTextInput(props: Props) {
	const {
		maxLength,
		channelDescription,
		setChannelDescription,
		textAreaRef,
		handleSaveChannelDescription,
		toggleEditAndAssignDefaultDescriptionName
	} = props

	const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelDescription(value)
		}
	}, [maxLength, setChannelDescription])

	const handleKeyDown = useCallback(async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			await handleSaveChannelDescription()
		}
	}, [handleSaveChannelDescription])

	return (
		<div className="w-full">
			<textarea
				ref={textAreaRef}
				className={
					`mt-1 p-1 border rounded text-zinc-950 dark:text-zinc-200 text-sm \
					bg-white dark:bg-zinc-800 outline-none w-full
					${channelDescription.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
				}
				value={channelDescription}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				maxLength={maxLength}
				style={{
					boxSizing: "border-box",
					resize: "none",
					overflow: "hidden"
				}}
				rows={2}
			/>
			<div className="flex items-center justify-between">
				<span className="text-xs text-zinc-600 dark:text-zinc-400">
					{channelDescription.length}/{maxLength}
				</span>
				<div className="flex items-center">
					<CancelEditingButton
						toggleEditAndAssignDefaultValue={toggleEditAndAssignDefaultDescriptionName}
					/>
					<SaveChannelDescriptionButton handleSaveChannelDescription={handleSaveChannelDescription} />
				</div>
			</div>
		</div>
	)
}
