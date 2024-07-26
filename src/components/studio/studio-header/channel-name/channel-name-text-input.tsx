import { useCallback, useEffect, useRef, useState } from "react"

interface Props {
	maxLength: number
	channelName: string
	setChannelName: React.Dispatch<React.SetStateAction<string>>
	handleSaveChannelName: () => Promise<void>
	inputRef: React.RefObject<HTMLInputElement>
}

export default function ChannelNameTextInput(props: Props) {
	const {
		maxLength,
		channelName,
		setChannelName,
		handleSaveChannelName,
		inputRef
	} = props

	const [inputWidth, setInputWidth] = useState(100)
	const spanRef = useRef<HTMLSpanElement>(null)

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length > maxLength) return
		setChannelName(value)
	}, [maxLength, setChannelName])

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			handleSaveChannelName()
		}
	}, [handleSaveChannelName])

	useEffect(() => {
		if (spanRef.current) {
			setInputWidth(spanRef.current.offsetWidth + 20) // Adding some padding
		}
	}, [channelName])

	return (
		<>
			<input
				type="text"
				ref={inputRef}
				className={
					`mt-1 p-1 border rounded text-zinc-950 dark:text-zinc-200 \
					bg-white dark:bg-zinc-800 outline-none text-xl font-semibold
					${channelName.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
				}
				value={channelName}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				maxLength={maxLength}
				style={{
					minWidth: "100px",
					width: `${inputWidth}px`,
					maxWidth: "1100px",
					boxSizing: "border-box"
				}}
			/>
			<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 ml-0.5">
				{channelName.length}/{maxLength}
			</span>
			{/* This inviside span is used to measure the size necessary to set the input width: */}
			<span
				ref={spanRef}
				className="absolute invisible whitespace-pre"
				style={{ fontSize: "1.25rem", fontWeight: "bold", padding: "0.25rem" }}
			>
				{channelName}
			</span>
		</>
	)
}
