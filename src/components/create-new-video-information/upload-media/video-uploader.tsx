import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import ContentPreview from "../../content-preview"
import { useCreatorContext } from "../../../contexts/creator-context"
import ChooseVideoToUploadButton from "./choose-video-to-upload-button"

function VideoUploader() {
	const creatorClass = useCreatorContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoDetails("selectedVideo", null)
	}, [creatorClass])

	const setSelectedPreviewUrlNull = useCallback(() => {
		setPreviewUrl(null)
	}, [])

	return (
		<>
			<ChooseVideoToUploadButton
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
			/>

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrlNull={setSelectedPreviewUrlNull}
				setSelectedContentNull={setSelectedContentNull}
			>
				<video
					src={previewUrl || ""}
					controls
					className="max-w-[100%] h-auto rounded-lg"
				/>
			</ContentPreview>
		</>
	)
}

export default observer(VideoUploader)
