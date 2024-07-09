import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import SaveButton from "../../save-button"
import useEditVideoName from "../../../../hooks/creator/edit-video-name"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useAssignDefaultVideoName from "../../../../hooks/creator/assign-default-video-name"

interface Props {
	videoUUID: string
}

function VideoNameTextInput(props: Props) {
	const { videoUUID } = props
	const maxLength = 100
	const [videoName, setVideoName] = useState("")
	const editVideoName = useEditVideoName()
	const assignDefaultVideoName = useAssignDefaultVideoName()
	const creatorClass = useCreatorContext()

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
		<div className="flex items-center w-full">
			<div className="relative flex flex-col flex-grow">
				<label className="text-sm text-zinc-700 dark:text-zinc-300 ml-0.5 font-semibold">
					Video Name
				</label>
				<input
					type="text"
					className={
						`mt-1 p-1 border rounded text-zinc-950 dark:text-zinc-200 \
						bg-white dark:bg-zinc-800 outline-none text-base font-medium w-full
						${videoName.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
					}
					value={videoName}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					maxLength={maxLength}
				/>
				<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 ml-0.5">
					{videoName.length}/{maxLength}
				</span>
			</div>
			{(!_.isEmpty(videoName) && (videoName !== creatorClass?.contextForMyContent(videoUUID)?.videoName)) && (
				<SaveButton
					handleSaveButton={handleSaveVideoName}
					extraClasses="mt-0.5 ml-2"
					customCirclePixelSize="33px"
				/>
			)}
		</div>
	)
}

export default observer(VideoNameTextInput)
