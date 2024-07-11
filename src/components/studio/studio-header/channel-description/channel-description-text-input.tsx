import { useCallback } from "react"
import SaveButton from "../../save-button"
import CancelEditingButton from "../../cancel-editing-button"

interface Props {
	maxLength: number
	channelDescription: string
	setChannelDescription: React.Dispatch<React.SetStateAction<string>>
	textAreaRef: React.RefObject<HTMLTextAreaElement>
	handleSaveChannelDescription: () => Promise<void>
	cancelEditAction: () => void
}

export default function ChannelDescriptionTextInput(props: Props) {
	const {
		maxLength,
		channelDescription,
		setChannelDescription,
		textAreaRef,
		handleSaveChannelDescription,
		cancelEditAction
	} = props

	const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value
		if (value.length > maxLength) return
		setChannelDescription(value)
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
				rows={2}
			/>
			<div className="flex items-center justify-between">
				<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
					{channelDescription.length}/{maxLength}
				</span>
				<div className="flex items-center">
					<CancelEditingButton cancelEditAction={cancelEditAction} />
					<SaveButton handleSaveButton={handleSaveChannelDescription} />
				</div>
			</div>
		</div>
	)
}
