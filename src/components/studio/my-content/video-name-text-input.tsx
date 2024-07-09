import { useCallback } from "react"

interface Props {
	maxLength: number
	videoName: string
	setVideoName: React.Dispatch<React.SetStateAction<string>>
	handleSaveVideoName: () => Promise<void>
	inputRef: React.RefObject<HTMLInputElement>
}

// TODO: Consider using the same component for video name and channel name. Check back in later
export default function VideoNameTextInput(props: Props) {
	const {
		maxLength,
		videoName,
		setVideoName,
		handleSaveVideoName,
		inputRef
	} = props

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length <= maxLength) {
			setVideoName(value)
		}
	}, [maxLength, setVideoName])

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			handleSaveVideoName()
		}
	}, [handleSaveVideoName])

	return (
		<>
			<input
				type="text"
				ref={inputRef}
				className={
					`mt-1 p-1 border rounded text-zinc-950 dark:text-zinc-200 \
					bg-white dark:bg-zinc-800 outline-none text-3xl font-semibold
					${videoName.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
				}
				value={videoName}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				maxLength={maxLength}
				style={{
					minWidth: "100px",
					width: `${videoName.length}ch`,
					maxWidth: "1000px",
					boxSizing: "border-box"
				}}
			/>
			<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 ml-0.5">
				{videoName.length}/{maxLength}
			</span>
		</>
	)
}
