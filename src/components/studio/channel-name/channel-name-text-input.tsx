import { useCallback } from "react"

interface Props {
	maxLength: number
	channelName: string
	setChannelName: React.Dispatch<React.SetStateAction<string>>
	handleSaveChannelName: () => Promise<void>
	updateWidth: (text: string) => void
	inputWidth: string
	inputRef: React.RefObject<HTMLInputElement>
}

export default function ChannelNameTextInput(props: Props) {
	const {
		maxLength,
		channelName,
		setChannelName,
		handleSaveChannelName,
		updateWidth,
		inputWidth,
		inputRef
	} = props

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setChannelName(value)
			updateWidth(value)
		}
	}, [maxLength, setChannelName, updateWidth])

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			handleSaveChannelName()
		}
	}, [handleSaveChannelName])

	return (
		<>
			<input
				type="text"
				ref={inputRef}
				className={
					`mt-1 p-1.5 border rounded text-zinc-950 dark:text-zinc-200 \
					bg-white dark:bg-zinc-800 outline-none text-3xl
					${channelName.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
				}
				value={channelName}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
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
	)
}
