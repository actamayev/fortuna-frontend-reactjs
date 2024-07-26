import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useCreatorContext } from "../../contexts/creator-context"

function VideoNameInput() {
	const creatorClass = useCreatorContext()
	const maxLength = 100

	const videoName = useMemo(() => {
		return creatorClass.newVideoDetails.videoName
	}, [creatorClass.newVideoDetails.videoName])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		creatorClass.updateNewVideoDetails("videoName", event.target.value)
	}, [creatorClass])

	return (
		<>
			<FormGroup
				label="Video Name"
				type="text"
				placeholder="Charlie bit my finger"
				onChange={updateNewVideoDetails}
				required
				value={videoName}
				maxLength={maxLength}
				className="mb-1"
			/>
			<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
				{videoName.length}/{maxLength}
			</span>
		</>
	)
}

export default observer(VideoNameInput)
