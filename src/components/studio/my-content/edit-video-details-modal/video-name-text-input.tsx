import _ from "lodash"
import { useCallback, useEffect, useState } from "react"
import SaveButton from "../../save-button"
import useEditVideoName from "../../../../hooks/creator/edit-video-name"
import useAssignDefaultVideoName from "../../../../hooks/creator/assign-default-video-name"

interface Props {
	videoUUID: string
}

export default function VideoNameTextInput(props: Props) {
	const { videoUUID } = props
	const maxLength = 100
	const [videoName, setVideoName] = useState("")
	const editVideoName = useEditVideoName()
	const assignDefaultVideoName = useAssignDefaultVideoName()

	useEffect(() => {
		assignDefaultVideoName(videoUUID, setVideoName)
	}, [assignDefaultVideoName, videoUUID])

	const handleSaveVideoName = useCallback(async () => {
		if (!_.isEmpty(videoName)) await editVideoName(videoUUID, videoName, setVideoName)
		else assignDefaultVideoName(videoUUID, setVideoName)
	}, [videoName, editVideoName, videoUUID, assignDefaultVideoName])

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
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<input
						type="text"
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
				</div>
			</div>
			{!_.isEmpty(videoName) && (
				<SaveButton handleSaveButton={handleSaveVideoName} extraClasses="mb-4" />
			)}
		</>
	)
}
