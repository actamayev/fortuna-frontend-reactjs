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
				<div className="max-w-[35%] h-auto" style={{ aspectRatio: "16/9" }}>
					<div className="relative w-full h-full rounded-xl overflow-hidden">
						<video
							controls
							className="w-full h-full object-cover"
						>
							<source src={previewUrl || ""} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</ContentPreview>
		</>
	)
}

export default observer(VideoUploader)
