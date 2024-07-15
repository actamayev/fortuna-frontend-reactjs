import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import ContentPreview from "../../content-preview"
import { useCreatorContext } from "../../../contexts/creator-context"
import ChooseThumbnailToUploadButton from "./choose-thumbnail-to-upload-button"

function ImageUploader() {
	const creatorClass = useCreatorContext()
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)

	const setSelectedContentNull = useCallback(() => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoDetails("selectedImage", null)
	}, [creatorClass])

	const setSelectedPreviewUrlNull = useCallback(() => {
		setPreviewUrl(null)
	}, [])

	return (
		<>
			<ChooseThumbnailToUploadButton
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
						<img
							src={previewUrl || ""}
							className="w-full h-full object-cover"
							alt="Video Thumbnail"
						/>
					</div>
				</div>
			</ContentPreview>
		</>
	)
}

export default observer(ImageUploader)
