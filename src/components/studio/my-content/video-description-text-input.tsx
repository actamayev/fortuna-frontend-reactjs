import { useCallback } from "react"

interface Props {
	maxLength: number
	videoDescription: string
	setVideoDescription: React.Dispatch<React.SetStateAction<string>>
	handleSaveVideoDescription: () => Promise<void>
	inputRef: React.RefObject<HTMLInputElement>
}

export default function VideoDescriptionTextInput(props: Props) {
	const {
		maxLength,
		videoDescription,
		setVideoDescription,
		handleSaveVideoDescription,
		inputRef
	} = props

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setVideoDescription(value)
		}
	}, [maxLength, setVideoDescription])

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			handleSaveVideoDescription()
		}
	}, [handleSaveVideoDescription])

	return (
		<>
			<input
				type="text"
				ref={inputRef}
				className={
					`mt-1 p-1 border rounded text-zinc-950 dark:text-zinc-200 \
					bg-white dark:bg-zinc-800 outline-none text-3xl font-semibold
					${videoDescription.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
				}
				value={videoDescription}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				maxLength={maxLength}
				style={{
					minWidth: "100px",
					width: `${videoDescription.length}ch`,
					maxWidth: "1000px",
					boxSizing: "border-box"
				}}
			/>
			<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 ml-0.5">
				{videoDescription.length}/{maxLength}
			</span>
		</>
	)
}
