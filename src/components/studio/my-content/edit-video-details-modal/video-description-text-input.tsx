import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useRef, useState } from "react"
import SaveButton from "../../save-button"
import { useCreatorContext } from "../../../../contexts/creator-context"
import useEditVideoDescription from "../../../../hooks/creator/video-description/edit-video-description"
import useAssignDefaultVideoDescription from "../../../../hooks/creator/video-description/assign-default-video-description"

interface Props {
	videoUUID: string
}

function VideoDescriptionTextInput(props: Props) {
	const { videoUUID } = props
	const maxLength = 5000
	const creatorClass = useCreatorContext()
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const [videoDescription, setVideoDescription] = useState("")
	const editVideoDescription = useEditVideoDescription()
	const assignDefaultVideoDescription = useAssignDefaultVideoDescription()

	useEffect(() => {
		assignDefaultVideoDescription(videoUUID, setVideoDescription)
	}, [assignDefaultVideoDescription, videoUUID])

	useEffect(() => {
		if (!textAreaRef.current) return
		textAreaRef.current.style.height = "auto"
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
	}, [videoDescription])

	const handleSaveVideoDescription = useCallback(async () => {
		if (!_.isEmpty(videoDescription)) await editVideoDescription(videoUUID, videoDescription, setVideoDescription)
		else assignDefaultVideoDescription(videoUUID, setVideoDescription)
	}, [videoDescription, editVideoDescription, videoUUID, assignDefaultVideoDescription])

	const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value
		if (value.length > maxLength) return
		setVideoDescription(value)
	}, [maxLength, setVideoDescription])

	const handleKeyDown = useCallback(async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			await handleSaveVideoDescription()
		}
	}, [handleSaveVideoDescription])

	return (
		<div className="flex items-center w-full">
			<div className="relative flex flex-col flex-grow">
				<label className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 ml-0.5 font-semibold">
					Description
				</label>
				<textarea
					ref={textAreaRef}
					className={
						`mt-0.5 p-1 border rounded text-zinc-800 dark:text-zinc-200 
						bg-white dark:bg-zinc-800 outline-none font-normal w-full
            			max-h-80 overflow-y-auto
						${videoDescription.length === maxLength ?
			"border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`
					}
					value={videoDescription}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					maxLength={maxLength}
				/>
				<span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 ml-0.5">
					{videoDescription.length}/{maxLength}
				</span>
			</div>
			{(!_.isEmpty(videoDescription) && (videoDescription !== creatorClass.contextForMyContent(videoUUID)?.description)) && (
				<SaveButton
					handleSaveButton={handleSaveVideoDescription}
					extraClasses="mt-1 ml-2"
					customCirclePixelSize="33px"
				/>
			)}
		</div>
	)
}

export default observer(VideoDescriptionTextInput)
