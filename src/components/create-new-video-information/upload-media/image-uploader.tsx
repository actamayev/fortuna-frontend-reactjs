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

	return (
		<>
			<ChooseThumbnailToUploadButton
				previewUrl={previewUrl}
				setPreviewUrl={setPreviewUrl}
			/>

			<ContentPreview
				previewUrl={previewUrl}
				setPreviewUrlNull={() => setPreviewUrl(null)}
				setSelectedContentNull={setSelectedContentNull}
			>
				<img
					src={previewUrl || ""}
					className="max-w-[35%] h-auto rounded-lg"
				/>
			</ContentPreview>
		</>
	)
}

export default observer(ImageUploader)
