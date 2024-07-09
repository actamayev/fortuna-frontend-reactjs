import _ from "lodash"
import { useCallback, useEffect, useState } from "react"
import SaveButton from "../../save-button"
import useEditVideoDescription from "../../../../hooks/creator/edit-video-description"
import useAssignDefaultVideoDescription from "../../../../hooks/creator/assign-default-video-description"

interface Props {
	videoUUID: string
}

export default function VideoDescriptionTextInput(props: Props) {
	const { videoUUID } = props
	const maxLength = 5000
	const [videoDescription, setVideoDescription] = useState("")
	const editVideoDescription = useEditVideoDescription()
	const assignDefaultVideoDescription = useAssignDefaultVideoDescription()

	useEffect(() => {
		assignDefaultVideoDescription(videoUUID, setVideoDescription)
	}, [assignDefaultVideoDescription, videoUUID])

	const handleSaveVideoDescription = useCallback(async () => {
		if (!_.isEmpty(videoDescription)) await editVideoDescription(videoUUID, videoDescription, setVideoDescription)
		else assignDefaultVideoDescription(videoUUID, setVideoDescription)
	}, [videoDescription, editVideoDescription, videoUUID, assignDefaultVideoDescription])

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
			<div className="flex items-center">
				<div className="relative flex flex-col">
					<input
						type="text"
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
				</div>
			</div>
			{!_.isEmpty(videoDescription) && (
				<SaveButton handleSaveButton={handleSaveVideoDescription} extraClasses="mb-4" />
			)}
		</>
	)
}
