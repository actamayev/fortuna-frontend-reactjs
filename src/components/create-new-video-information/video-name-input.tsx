import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../form-group"
import { useCreatorContext } from "../../contexts/creator-context"

function VideoNameInput() {
	const creatorClass = useCreatorContext()
	const maxLength = 100

	const videoName = useMemo(() => {
		if (_.isNull(creatorClass)) return ""
		return creatorClass.newVideoDetails.videoName
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.videoName])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoDetails("videoName", event.target.value)
	}, [creatorClass])

	return (
		<>
			<FormGroup
				label = "Video Name"
				type = "text"
				placeholder = "Charlie bit my finger"
				onChange = {updateNewVideoDetails}
				required
				value = {videoName}
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
